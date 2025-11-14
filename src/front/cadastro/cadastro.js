const USERS_KEY = "moeda_users";

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

document.getElementById("cadForm").addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const users = loadUsers();

  if (users.some(u => u.email === email)) {
    alert("Este email já está cadastrado!");
    return;
  }

  const novo = {
    nome,
    email,
    senha,
    saldo: 250,
    historico: []
  };

  users.push(novo);
  saveUsers(users);

  alert("Conta criada com sucesso!");
  window.location.href = "../login/login.html";
});
