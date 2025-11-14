// ===============================
//  extrato.js v3
//  conectado ao usuário logado
// ===============================

const USERS_KEY = "moeda_users";
const USER_ATUAL_KEY = "moeda_user_atual";

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function loadUserAtual() {
  const raw = localStorage.getItem(USER_ATUAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

let allUsers = loadUsers();
let userAtual = loadUserAtual();

// se não estiver logado → volta para o login
if (!userAtual || !allUsers.some(u => u.email === userAtual.email)) {
  alert("Nenhum usuário logado!");
  window.location.href = "../login/login.html";
}

// pega dados do usuário logado
let studentData = allUsers.find(u => u.email === userAtual.email);

// elemento da lista
const extratoList = document.getElementById("extratoList");

function fmt(value) {
  return Number(value).toFixed(2).replace(".", ",");
}

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

// icones lucide
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
