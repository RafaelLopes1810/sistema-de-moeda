// telaInicial.js - Mocked frontend behavior (standardized and improved)

// Mocked student data (persist in localStorage so state survives refresh)
const STORAGE_KEY = "moeda_student_mock_v1";

const defaultData = {
  nome: "Rafael de Oliveira",
  saldo: 200.00,
  historico: [
    { destino: "João Silva", valor: 50.00, data: "2025-10-28" },
    { destino: "Maria Santos", valor: 30.00, data: "2025-10-29" }
  ]
};

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return JSON.parse(JSON.stringify(defaultData));
    }
    return JSON.parse(raw);
  }catch(e){
    console.error("Erro ao carregar dados:", e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function saveData(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Init lucide icons if available
if (typeof lucide !== 'undefined' && lucide.createIcons) {
  lucide.createIcons();
}

// Elements
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

let studentData = loadData();

// Utility: format money
function fmt(value){
  return Number(value).toFixed(2).replace('.',',');
}

// Utility: simple CPF validation (format and digits count)
function validarCPF(cpf){
  if(!cpf) return false;
  const onlyDigits = cpf.replace(/\D/g,'');
  return onlyDigits.length === 11;
}

// Toasts
let toastTimer = null;
function showToast(msg, type='info'){
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.className = 'toast show ' + type;
  toastTimer = setTimeout(()=> {
    toastEl.className = 'toast';
  }, 3500);
}

// Render UI
function renderBalance(){
  studentNameEl.textContent = studentData.nome;
  balanceAmountEl.textContent = fmt(studentData.saldo);
  availableBalanceEl.textContent = fmt(studentData.saldo);
}

function renderHistorico(){
  listaHistoricoEl.innerHTML = '';
  if(!studentData.historico || studentData.historico.length===0){
    listaHistoricoEl.innerHTML = '<p class="empty">Nenhuma transação encontrada.</p>';
    return;
  }
  const ul = document.createElement('ul');
  ul.className = 'history-list';
  studentData.historico.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `<span class="history-desc">${item.destino}</span>
                    <span class="history-value">${item.valor>0?'+':'-'} ${fmt(item.valor)} moedas</span>
                    <div class="history-date">${item.data}</div>`;
    ul.appendChild(li);
  });
  listaHistoricoEl.appendChild(ul);
}

function updateUI(){
  renderBalance();
  renderHistorico();
}

// Toggle transfer form
btnTransfer.addEventListener('click', () => {
  transferFormCard.style.display = 'block';
});

btnCloseForm.addEventListener('click', () => {
  transferFormCard.style.display = 'none';
});

// Handle submit transfer (mock)
formTransfer.addEventListener('submit', (e) => {
  e.preventDefault();
  const cpf = cpfDestinoInput.value.trim();
  const valor = Number(valorInput.value);

  if(!validarCPF(cpf)){
    showToast('CPF inválido. Use o formato 000.000.000-00', 'error');
    return;
  }
  if(isNaN(valor) || valor <= 0){
    showToast('Valor inválido. Informe um valor maior que 0.', 'error');
    return;
  }
  if(valor > studentData.saldo){
    showToast('Saldo insuficiente.', 'error');
    return;
  }

  // Simular destinatário com base no CPF (apenas máscara)
  const destinatario = 'Usuário ' + cpf.replace(/\D/g,'').slice(-4);

  // Realizar a operação no mock
  studentData.saldo = Number((studentData.saldo - valor).toFixed(2));
  studentData.historico.unshift({
    destino: destinatario,
    valor: -Math.abs(valor),
    data: new Date().toISOString().split('T')[0]
  });

  saveData(studentData);
  updateUI();
  formTransfer.reset();
  transferFormCard.style.display = 'none';
  showToast('Transferência realizada com sucesso!', 'success');
});

// Initialize
updateUI();
