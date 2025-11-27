// =============================
// vantagens.js - multicontas OK
// =============================

const USERS_KEY = "moeda_users";
const USER_ATUAL_KEY = "moeda_user_atual";
const VANTAGENS_KEY = "moeda_vantagens_mock_v1";

// vantagens padrão
const defaultVantagens = [
  { id: 1, nome: "Caneca Personalizada", descricao: "Caneca com logo da instituição", custo: 50, imagem: "IMG/caneca.png" },
  { id: 2, nome: "Livro de Programação", descricao: "Livro técnico de programação", custo: 120, imagem: "IMG/livro.webp" },
  { id: 3, nome: "Curso de Inglês Online", descricao: "Curso intensivo online", custo: 300, imagem: "IMG/curso.jpeg" },
  { id: 4, nome: "Fone Bluetooth", descricao: "Fone sem fio - sorteio", custo: 200, imagem: "IMG/fone.webp" },
  { id: 5, nome: "Camiseta Oficial", descricao: "Camiseta oficial do projeto", custo: 80, imagem: "IMG/camisa.webp" }
];

// -------- carregar vantagens --------
function loadVantagens() {
  const raw = localStorage.getItem(VANTAGENS_KEY);

  try {
    const parsed = raw ? JSON.parse(raw) : null;

    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(VANTAGENS_KEY, JSON.stringify(defaultVantagens));
      return defaultVantagens;
    }

    return parsed;
  } catch {
    localStorage.setItem(VANTAGENS_KEY, JSON.stringify(defaultVantagens));
    return defaultVantagens;
  }
}

// -------- carregar usuários --------
function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

// -------- carregar usuário logado --------
function loadUserAtual() {
  const raw = localStorage.getItem(USER_ATUAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

// -------- pegar usuário atual --------
let allUsers = loadUsers();
let userAtual = loadUserAtual();

if (!userAtual || !allUsers.some(u => u.email === userAtual.email)) {
  alert("Nenhum usuário logado!");
  window.location.href = "../login/index.html";
}

let student = allUsers.find(u => u.email === userAtual.email);

// ----- normalizar saldo, historico e resgates -----
if (typeof student.saldo !== "number" || Number.isNaN(student.saldo)) {
  student.saldo = student.saldoMoedas ?? 0; // usa saldoMoedas se existir
}

if (!Array.isArray(student.historico)) {
  student.historico = [];
}

if (!Array.isArray(student.resgates)) {
  student.resgates = [];
}


// -------- salvar usuário após resgate --------
function saveStudent() {
  const idx = allUsers.findIndex(u => u.email === student.email);
  allUsers[idx] = student;

  localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  localStorage.setItem(USER_ATUAL_KEY, JSON.stringify(student));
}

// -------- elementos --------
const container = document.getElementById("vantagensContainer");
const modal = document.getElementById("modalCupom");
const modalCodeEl = document.getElementById("modalCode");
const modalClose = document.getElementById("modalFechar");

let vantagens = loadVantagens();

// formatador
function fmt(v) {
  return Number(v).toFixed(2).replace(".", ",");
}

// -------- renderizar cards --------
function render() {
  container.innerHTML = "";

  vantagens.forEach(v => {
    const card = document.createElement("div");
    card.className = "vantagem-card";

    card.innerHTML = `
      <img src="${v.imagem}">
      <div class="vantagem-body">
        <div class="vantagem-title">${v.nome}</div>
        <div class="vantagem-desc">${v.descricao}</div>
      </div>

      <div class="vantagem-footer">
        <div class="price">${fmt(v.custo)} moedas</div>
        <button class="btn-resgatar" data-id="${v.id}">Resgatar</button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll(".btn-resgatar")
    .forEach(btn => btn.addEventListener("click", onResgatar));

  updateButtons();
}

// -------- atualizar botões --------
function updateButtons() {
  document.querySelectorAll(".btn-resgatar").forEach(btn => {
    const id = Number(btn.dataset.id);
    const vant = vantagens.find(v => v.id === id);

    if (!vant) {
      btn.disabled = true;
      return;
    }

    btn.disabled = student.saldo < vant.custo;
  });
}

// -------- resgatar item --------
function onResgatar(e) {
  const id = Number(e.target.dataset.id);
  const vant = vantagens.find(v => v.id === id);

  if (!vant) return;

  if (student.saldo < vant.custo) {
    alert("Saldo insuficiente!");
    return;
  }

  student.saldo = Number((student.saldo - vant.custo).toFixed(2));
  student.saldoMoedas = student.saldo; // manter sincronizado


  const code = "CUPOM-" + Math.random().toString(36).substr(2, 8).toUpperCase();

  // -------- enviar email com o cupom --------
  emailjs.send("service_7gm631s", "template_rqqe08g", {
    to_email: student.email,
    user_name: student.nome ?? "Aluno",
    vantagem_nome: vant.nome,
    vantagem_preco: vant.custo,
    cupom_codigo: code
  })
    .then(() => {
      console.log("Email enviado com sucesso!");
    })
    .catch(err => {
      console.error("Erro ao enviar email:", err);
    });


  if (!Array.isArray(student.historico)) {
    student.historico = [];
  }

  student.historico.unshift({
    destino: "Resgate: " + vant.nome,
    valor: -vant.custo,
    data: new Date().toISOString().split("T")[0],
    cupom: code
  });

  if (!student.resgates) student.resgates = [];

  student.resgates.unshift({
    idVantagem: vant.id,
    nome: vant.nome,
    custo: vant.custo,
    codigo: code,
    data: new Date().toISOString()
  });

  saveStudent();

  modalCodeEl.textContent = code;
  modal.classList.add("show");

}

// fechar modal
modalClose.addEventListener("click", () => modal.classList.remove("show"));

render();
