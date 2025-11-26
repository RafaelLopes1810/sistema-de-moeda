// ===============================
//  sistema telaInicial.js v3
//  agora com login + multicontas
// ===============================

const USERS_KEY = "moeda_users";
const USER_ATUAL_KEY = "moeda_user_atual";

// carrega lista de usuários
function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

// carrega usuário logado
function loadUserAtual() {
  const raw = localStorage.getItem(USER_ATUAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

let allUsers = loadUsers();
let userAtual = loadUserAtual();

// se não tiver usuário logado → volta ao login
if (!userAtual || !allUsers.some(u => u.email === userAtual.email)) {
  alert("Nenhum usuário logado!");
  window.location.href = "../login/index.html";
}

// pega usuário atual da lista real
let studentData = allUsers.find(u => u.email === userAtual.email);

// ======================================
// FUNÇÃO PARA SALVAR ALTERAÇÕES
// ======================================
function saveStudent() {
  const idx = allUsers.findIndex(u => u.email === studentData.email);
  allUsers[idx] = studentData;

  localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  localStorage.setItem(USER_ATUAL_KEY, JSON.stringify(studentData));
}

// ======================================
// UTILITÁRIOS
// ======================================
function fmt(value) {
  return Number(value).toFixed(2).replace('.', ',');
}

function validarCPF(cpf) {
  if (!cpf) return false;
  const onlyDigits = cpf.replace(/\D/g, '');
  return onlyDigits.length === 11;
}

// ======================================
// ELEMENTOS
// ======================================
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

// ======================================
// TOAST
// ======================================
let toastTimer = null;
function showToast(msg, type = 'info') {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.className = 'toast show ' + type;

  toastTimer = setTimeout(() => {
    toastEl.className = 'toast';
  }, 3000);
}

// ======================================
// RENDERIZAÇÃO
// ======================================
function renderBalance() {
  studentNameEl.textContent = studentData.nome;
  balanceAmountEl.textContent = fmt(studentData.saldo);
  availableBalanceEl.textContent = fmt(studentData.saldo);
}

function renderHistorico() {
  listaHistoricoEl.innerHTML = '';

  if (!studentData.historico || studentData.historico.length === 0) {
    listaHistoricoEl.innerHTML = `<p class="empty">Nenhuma transação encontrada.</p>`;
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'history-list';

  studentData.historico.forEach(item => {
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

// ======================================
// EVENTOS DO FORMULÁRIO DE TRANSFERÊNCIA
// ======================================
btnTransfer.addEventListener('click', () => {
  transferFormCard.style.display = 'block';
});

btnCloseForm.addEventListener('click', () => {
  transferFormCard.style.display = 'none';
});

formTransfer.addEventListener('submit', (e) => {
  e.preventDefault();

  const cpf = cpfDestinoInput.value.trim();
  const valor = Number(valorInput.value);

  if (!validarCPF(cpf)) {
    showToast("CPF inválido! Use o formato 000.000.000-00", "error");
    return;
  }

  if (isNaN(valor) || valor <= 0) {
    showToast("Informe um valor válido!", "error");
    return;
  }

  if (valor > studentData.saldo) {
    showToast("Saldo insuficiente!", "error");
    return;
  }

  const destinoNome = "Usuário " + cpf.replace(/\D/g, "").slice(-4);

  studentData.saldo = Number((studentData.saldo - valor).toFixed(2));
  studentData.historico.unshift({
    destino: destinoNome,
    valor: -Math.abs(valor),
    data: new Date().toISOString().split("T")[0]
  });

  saveStudent();
  updateUI();

  formTransfer.reset();
  transferFormCard.style.display = 'none';

  showToast("Transferência realizada!", "success");
});

// ======================================
// INICIALIZAÇÃO
// ======================================
updateUI();

// lucide icons
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
