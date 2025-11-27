// ===============================
//  extrato.js (versão JSON mock)
// ===============================

// 🔹 CONSTANTE DO USER LOGADO
const USER_ATUAL_KEY = "moeda_user_atual";

// 🔹 JSON FIXO DE ALUNOS (MESMO DA TELA INICIAL)
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

// buscar usuário real no JSON mock
let studentData = ALUNOS_MOCK.find(u => u.email === userAtual.email);

if (!studentData) {
  alert("Usuário não encontrado!");
  window.location.href = "../login/index.html";
}

// elemento da lista
const extratoList = document.getElementById("extratoList");

// ===============================
// FORMATAR MOEDAS
// ===============================
function fmt(value) {
  return Number(value).toFixed(2).replace(".", ",");
}

// ===============================
// RENDERIZAR EXTRATO
// ===============================
function renderExtrato() {
  extratoList.innerHTML = "";

  if (!studentData.historico || studentData.historico.length === 0) {
    extratoList.innerHTML = "<p class='empty'>Nenhuma transação encontrada.</p>";
    return;
  }

  studentData.historico.forEach(t => {
    const div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <div>
        <strong>${t.destino}</strong>
        <div class="history-date">${t.data}</div>
      </div>

      <div class="history-value">
        ${t.valor > 0 ? "+" : ""}${fmt(t.valor)} moedas
      </div>
    `;

    extratoList.appendChild(div);
  });
}

renderExtrato();

// lucide icons
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
