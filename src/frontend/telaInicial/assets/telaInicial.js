// Simulação de dados
let aluno = {
  nome: "Rafael de Oliveira",
  saldo: 250.00,
  historico: [
    { destino: "João Silva", valor: 50.00, data: "2025-10-28" },
    { destino: "Maria Santos", valor: 30.00, data: "2025-10-29" }
  ]
};

// Exibir informações iniciais
document.getElementById("nomeAluno").textContent = aluno.nome;
document.getElementById("saldoAluno").textContent = `${aluno.saldo.toFixed(2)} moedas`;
atualizarHistorico();

function atualizarHistorico() {
  const lista = document.getElementById("historicoLista");
  lista.innerHTML = "";

  aluno.historico.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.destino}</span>
      <span>${item.valor.toFixed(2)} moedas</span>
      <small>${item.data}</small>
    `;
    lista.appendChild(li);
  });
}

// Mostrar/ocultar o formulário de transferência
document.getElementById("btnTransferir").addEventListener("click", () => {
  const section = document.getElementById("transferSection");
  section.style.display = section.style.display === "none" ? "block" : "none";
});

// Simular transferência
document.getElementById("transferForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const cpf = document.getElementById("cpfDestino").value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (valor > aluno.saldo) {
    alert("Saldo insuficiente!");
    return;
  }

  aluno.saldo -= valor;
  aluno.historico.unshift({
    destino: `Maria Santos`,
    valor,
    data: new Date().toISOString().split('T')[0]
  });

  document.getElementById("saldoAluno").textContent = `R$ ${aluno.saldo.toFixed(2)}`;
  atualizarHistorico();

  document.getElementById("transferForm").reset();
  alert("Transferência realizada com sucesso!");
});
