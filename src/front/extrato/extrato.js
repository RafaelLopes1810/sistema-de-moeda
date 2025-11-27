// ===============================
//  extrato.js (mostrar histórico global)
// ===============================

const USER_ATUAL_KEY = "moeda_user_atual";
const HISTORICO_GLOBAL_KEY = "moeda_historico_global";

// carregar usuário atual
function loadUserAtual() {
  const raw = localStorage.getItem(USER_ATUAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

let userAtual = loadUserAtual();

if (!userAtual) {
  alert("Nenhum usuário logado!");
  window.location.href = "../login/index.html";
}

// carregar histórico global
function loadHistoricoGlobal() {
  const raw = localStorage.getItem(HISTORICO_GLOBAL_KEY);
  return raw ? JSON.parse(raw) : [];
}

const historicoGlobal = loadHistoricoGlobal();

// elemento da lista
const extratoList = document.getElementById("extratoList");

function fmt(value) {
  return Number(value).toFixed(2).replace(".", ",");
}

function renderExtratoGlobal() {
  extratoList.innerHTML = "";

  // 🔥 filtra histórico somente do usuário logado
  const historicoFiltrado = historicoGlobal.filter(record =>
    record.fromCpf === userAtual.cpf || record.toCpf === userAtual.cpf
  );

  if (historicoFiltrado.length === 0) {
    extratoList.innerHTML = "<p class='empty'>Nenhuma transação encontrada.</p>";
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "history-list";

  historicoFiltrado.forEach(record => {
    const li = document.createElement("li");
    li.className = "history-item";

    const rawValor = Number(record.valor || 0);
    const sign = rawValor > 0 ? "+" : "";
    const date = record.data;

    const header = record.fromCpf === userAtual.cpf
      ? "Para " + record.to
      : "De " + record.from;

    li.innerHTML = `
      <div class="history-left">
        <strong class="history-header">${header}</strong>
        <div class="history-date">${date}</div>
      </div>
      <div class="history-right">
        <div class="history-value">${sign}${fmt(Math.abs(rawValor))} moedas</div>
      </div>
    `;

    ul.appendChild(li);
  });

  extratoList.appendChild(ul);
}


renderExtratoGlobal();

// lucide icons
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
