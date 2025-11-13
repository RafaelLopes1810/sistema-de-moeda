// Dados simulados
let studentData = {
  nome: "Rafael de Oliveira",
  saldo: 250.00,
  historico: [
    { destino: "João Silva", valor: 50.00, data: "2025-10-28" },
    { destino: "Maria Santos", valor: 30.00, data: "2025-10-29" }
  ]
};

// Inicializar Lucide icons
lucide.createIcons();

// Elementos
const studentNameEl = document.getElementById('studentName');
const balanceAmountEl = document.getElementById('balanceAmount');
const availableBalanceEl = document.getElementById('availableBalance');
const btnTransfer = document.getElementById('btnTransfer');
const btnCloseForm = document.getElementById('btnCloseForm');
const transferForm = document.getElementById('transferForm');
const formTransfer = document.getElementById('formTransfer');
const historyList = document.getElementById('historyList');
const toastEl = document.getElementById('toast');

// Atualizar UI inicial
function updateUI() {
  studentNameEl.textContent = studentData.nome;
  balanceAmountEl.textContent = studentData.saldo.toFixed(2);
  availableBalanceEl.textContent = studentData.saldo.toFixed(2);
  renderHistory();
}

// Renderizar histórico
function renderHistory() {
  if (studentData.historico.length === 0) {
    historyList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <i data-lucide="arrow-up-right"></i>
        </div>
        <p class="empty-text">Nenhuma transferência realizada ainda</p>
      </div>
    `;
  } else {
    historyList.innerHTML = studentData.historico.map(item => `
      <div class="history-item">
        <div class="history-item-left">
          <div class="history-avatar">
            <i data-lucide="user"></i>
          </div>
          <div>
            <div class="history-name">${item.destino}</div>
            <div class="history-date">${formatDate(item.data)}</div>
          </div>
        </div>
        <div class="history-item-right">
          <div class="history-amount">-${item.valor.toFixed(2)}</div>
          <div class="history-currency">moedas</div>
        </div>
      </div>
    `).join('');
  }
  
  lucide.createIcons();
}

// Formatar data
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Mostrar toast
function showToast(message, type = 'success') {
  toastEl.textContent = message;
  toastEl.className = `toast show ${type}`;
  
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}

// Toggle formulário
btnTransfer.addEventListener('click', () => {
  const isVisible = transferForm.style.display === 'block';
  transferForm.style.display = isVisible ? 'none' : 'block';
  
  if (!isVisible) {
    transferForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

btnCloseForm.addEventListener('click', () => {
  transferForm.style.display = 'none';
});

// Submeter transferência
formTransfer.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const cpf = document.getElementById('cpfDestino').value;
  const valor = parseFloat(document.getElementById('valor').value);
  
  if (!cpf || !valor) {
    showToast('Preencha todos os campos', 'error');
    return;
  }
  
  if (valor <= 0) {
    showToast('O valor deve ser maior que zero', 'error');
    return;
  }
  
  if (valor > studentData.saldo) {
    showToast('Saldo insuficiente', 'error');
    return;
  }
  
  // Realizar transferência
  studentData.saldo -= valor;
  studentData.historico.unshift({
    destino: "Maria Santos",
    valor: valor,
    data: new Date().toISOString().split('T')[0]
  });
  
  updateUI();
  formTransfer.reset();
  transferForm.style.display = 'none';
  showToast('Transferência realizada com sucesso!', 'success');
});

// Inicializar
updateUI();
