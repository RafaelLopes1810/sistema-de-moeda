// ===============================
//  extrato.js (mostrar histórico + resgates)
// ===============================

const USER_ATUAL_KEY = "moeda_user_atual";
const HISTORICO_GLOBAL_KEY = "moeda_historico_global";

// ----- carregar usuário atual -----
function loadUserAtual() {
  const raw = localStorage.getItem(USER_ATUAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

let userAtual = loadUserAtual();

if (!userAtual) {
  alert("Nenhum usuário logado!");
  window.location.href = "../login/index.html";
}

// ----- carregar histórico global -----
function loadHistoricoGlobal() {
  const raw = localStorage.getItem(HISTORICO_GLOBAL_KEY);
  return raw ? JSON.parse(raw) : [];
}

const historicoGlobal = loadHistoricoGlobal();

// elemento do HTML
const extratoList = document.getElementById("extratoList");

// formatador
function fmt(v) {
  return Number(v).toFixed(2).replace(".", ",");
}

// ----- renderizar extrato -----
function renderExtratoGlobal() {
  extratoList.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "history-list";

  // ==================================================
  // 1) TRANSFERÊNCIAS (histórico global)
  // ==================================================
  const historicoFiltrado = historicoGlobal.filter(record =>
    record.fromCpf === userAtual.cpf || record.toCpf === userAtual.cpf
  );

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

  // ==================================================
  // 2) RESGATES (cupom gerado na tela de vantagens)
  // ==================================================

  const resgates = userAtual.resgates || [];

  resgates.forEach(resg => {
    const li = document.createElement("li");
    li.className = "history-item history-resgate";

    const date = new Date(resg.data).toLocaleDateString("pt-BR");
    const nome = resg.nome;
    const custo = resg.custo;
    const code = resg.codigo;

    li.innerHTML = `
      <div class="history-left">
        <strong class="history-header">Resgate: ${nome}</strong>
        <div class="history-date">${date}</div>
        <div class="history-cupom">Cupom: <span>${code}</span></div>
      </div>

      <div class="history-right">
        <div class="history-value">-${fmt(custo)} moedas</div>
      </div>
    `;

    ul.appendChild(li);
  });

  // Se nada existir
  if (ul.children.length === 0) {
    extratoList.innerHTML = "<p class='empty'>Nenhuma transação encontrada.</p>";
    return;
  }

  extratoList.appendChild(ul);
}

renderExtratoGlobal();
