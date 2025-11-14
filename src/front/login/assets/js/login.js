const USERS_KEY = "moeda_users";
const USER_ATUAL_KEY = "moeda_user_atual";

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const senhaInput = document.getElementById("senha").value.trim();

  const users = loadUsers();

  const found = users.find(
    (u) => u.email === emailInput && u.senha === senhaInput
  );

  if (!found) {
    alert("Email ou senha incorretos!");
    return;
  }

  // salva o usuário logado
  localStorage.setItem(USER_ATUAL_KEY, JSON.stringify(found));

  // redireciona
  window.location.href = "../telaInicial/telaInicial.html";
});
