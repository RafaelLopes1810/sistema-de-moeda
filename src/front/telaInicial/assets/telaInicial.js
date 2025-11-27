// ===============================
//  telaInicial.js (corrigido: saldos atualizam)
// ===============================

// 🔹 CONSTANTES
const USERS_KEY = "moeda_users";
const USER_ATUAL_KEY = "moeda_user_atual";
const HISTORICO_GLOBAL_KEY = "moeda_historico_global";

// 🔹 JSON FIXO COM ALUNOS (seed)
const ALUNOS_MOCK = [
  {
    email: "rafaeldeoliveiracl@gmail.com",
    senha: "123",
    nome: "Rafael Lopes",
    cpf: "14440020666",
    curso: "Engenharia de Software",
    saldoMoedas: 1000,
    historico: [],
    tipo: "aluno"
  },
  {
    email: "acandian15@gmail.com",
    senha: "123",
    nome: "Arthur Candian",
    cpf: "15208514648",
    curso: "Engenharia de Software",
    saldoMoedas: 1500,
    historico: [],
    tipo: "aluno"
  },
  {
    email: "luishfantini@gmail.com",
    senha: "123",
    nome: "Luis Fantini",
    cpf: "11111111111",
    curso: "Engenharia de Software",
    saldoMoedas: 800,
    historico: [],
    tipo: "aluno"
  }
];

// ===============================
//  CARREGAR / INICIAR USERS
// ===============================
function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers() {
  localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
}

let allUsers = loadUsers();
if (!allUsers || allUsers.length === 0) {
  allUsers = ALUNOS_MOCK.map(u => ({ ...u })); // copia para evitar mutação do literal
  saveUsers();
}

// ===============================
//  CARREGAR USUÁRIO ATUAL
// ===============================
function loadUserAtual() {
  const raw = localStorage.getItem(USER_ATUAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

let userAtual = loadUserAtual();

if (!userAtual) {
  alert("Nenhum usuário logado!");
  window.location.href = "../login/index.html";
}

// pega o objeto real dentro de allUsers (referência)
let studentData = allUsers.find(u => u.email === userAtual.email);

if (!studentData) {
  alert("Usuário não encontrado na base!");
  window.location.href = "../login/index.html";
}

// ===============================
//  CARREGAR HISTÓRICO GLOBAL
// ===============================
function loadHistoricoGlobal() {
  const raw = localStorage.getItem(HISTORICO_GLOBAL_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveHistoricoGlobal() {
  localStorage.setItem(HISTORICO_GLOBAL_KEY, JSON.stringify(historicoGlobal));
}

let historicoGlobal = loadHistoricoGlobal();

// ===============================
//  SALVAR USER_ATUAL (sincroniza com studentData atual)
// ===============================
function saveUserAtual() {
  // atualiza userAtual com os dados do studentData antes de salvar
  const minimal = { ...userAtual, nome: studentData.nome, saldoMoedas: studentData.saldoMoedas, historico: studentData.historico };
  localStorage.setItem(USER_ATUAL_KEY, JSON.stringify(minimal));
}

// ===============================
// UTILITÁRIOS
// ===============================
function fmt(value) {
  return Number(value).toFixed(2).replace('.', ',');
}

function validarCPF(cpf) {
  const digits = cpf.replace(/\D/g, '');
  return digits.length === 11;
}

function formatarCPF(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
}

// ===============================
// ELEMENTOS HTML
// ===============================
const studentNameEl = document.getElementById('studentName');
const balanceAmountEl = document.getElementById('balanceAmount');
const availableBalanceEl = document.getElementById('availableBalance');
const listaHistoricoEl = document.getElementById('historyList');

const btnTransfer = document.getElementById('btnTransfer');
const transferFormCard = document.getElementById('transferForm');
const btnCloseForm = document.getElementById('btnCloseForm');

const formTransfer = document.getElementById('formTransfer');
const cpfDestinoInput = document.getElementById('cpfDestino');
const valorInput = document.getElementById('valor');

const toastEl = document.getElementById('toast');

// ===============================
// MÁSCARA DE CPF
// ===============================
cpfDestinoInput.addEventListener("input", () => {
  cpfDestinoInput.value = formatarCPF(cpfDestinoInput.value);
});

// ===============================
// TOAST
// ===============================
let toastTimer = null;
function showToast(msg, type = 'info') {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.className = 'toast show ' + type;

  toastTimer = setTimeout(() => {
    toastEl.className = 'toast';
  }, 3000);
}

// ===============================
// RENDERIZAÇÃO
// ===============================
function renderBalance() {
  studentNameEl.textContent = studentData.nome;
  balanceAmountEl.textContent = fmt(studentData.saldoMoedas ?? 0);
  availableBalanceEl.textContent = fmt(studentData.saldoMoedas ?? 0);
}

function renderHistorico() {
  listaHistoricoEl.innerHTML = '';

  if (historicoGlobal.length === 0) {
    listaHistoricoEl.innerHTML = `<p class="empty">Nenhuma transação encontrada.</p>`;
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'history-list';

  historicoGlobal.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';

    li.innerHTML = `
      <span class="history-desc">${item.destino}</span>
      <span class="history-value">${item.valor > 0 ? "+" : ""}${fmt(item.valor)} moedas</span>
      <div class="history-date">${item.data}</div>
    `;

    ul.appendChild(li);
  });

  listaHistoricoEl.appendChild(ul);
}

function updateUI() {
  renderBalance();
  renderHistorico();
}

// ===============================
// EVENTOS DO FORMULÁRIO DE TRANSFERÊNCIA
// ===============================
btnTransfer.addEventListener('click', () => {
  transferFormCard.style.display = 'block';
});

btnCloseForm.addEventListener('click', () => {
  transferFormCard.style.display = 'none';
});

formTransfer.addEventListener('submit', (e) => {
  e.preventDefault();

  const cpfFormatado = cpfDestinoInput.value.trim();
  const cpfLimpo = cpfFormatado.replace(/\D/g, '');
  const valor = Number(valorInput.value);

  if (!validarCPF(cpfLimpo)) {
    showToast("CPF inválido!", "error");
    return;
  }

  if (isNaN(valor) || valor <= 0) {
    showToast("Informe um valor válido!", "error");
    return;
  }

  if (valor > studentData.saldoMoedas) {
    showToast("Saldo insuficiente!", "error");
    return;
  }

  const destino = allUsers.find(a => a.cpf === cpfLimpo);
  const destinoNome = destino ? destino.nome : "Aluno Teste";

  // ==========================
  // ATUALIZAÇÃO DE SALDOS
  // ==========================
  studentData.saldoMoedas -= valor;

  if (destino) destino.saldoMoedas += valor;

  // ==========================
  // SALVAR NO HISTÓRICO GLOBAL (FORMATO DO extrato.js)
  // ==========================

  const dataHoje = new Date().toISOString().split("T")[0];

  // registro global do remetente
  historicoGlobal.unshift({
    from: studentData.nome,
    fromCpf: studentData.cpf,
    to: destinoNome,
    toCpf: destino ? destino.cpf : cpfLimpo,
    valor: -valor,
    data: dataHoje
  });

  // registro global do destinatário
  historicoGlobal.unshift({
    from: destinoNome,
    fromCpf: destino ? destino.cpf : cpfLimpo,
    to: studentData.nome,
    toCpf: studentData.cpf,
    valor: +valor,
    data: dataHoje
  });

  // ==========================
  // PERSISTÊNCIA
  // ==========================
  saveUsers();
  saveHistoricoGlobal();
  saveUserAtual();

  // ===============================
  //  ENVIAR EMAIL PARA O DESTINATÁRIO
  // ===============================
  if (destino) {
    emailjs.send("service_7gm631s", "template_4hx8ig9", {
      to_email: destino.email,
      to_name: destino.nome,
      from_name: studentData.nome,
      valor: valor,
      data: dataHoje
    })
      .then(() => console.log("E-mail enviado ✔"))
      .catch(err => console.error("Erro ao enviar e-mail:", err));
  }

  // UI
  updateUI();

  formTransfer.reset();
  transferFormCard.style.display = 'none';
  showToast("Transferência realizada!", "success");
});

// ===============================
// INICIALIZAÇÃO
// ===============================
updateUI();

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
