const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Modal JS
const modal = document.getElementById('modalCadastro');
const abrir = document.getElementById('abrirModal');
const fechar = document.getElementById('fecharModal');

abrir.addEventListener('click', () => {
	modal.style.display = 'flex';
});

fechar.addEventListener('click', () => {
	modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.style.display = 'none';
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("modalCadastro");
	const btnAbrir = document.getElementById("abrirModal");
	const btnFechar = document.getElementById("fecharModal");
	const btnFinalizar = document.getElementById("finalizarCadastro");

	// abrir modal
	btnAbrir.addEventListener("click", () => {
		modal.style.display = "block";
	});

	// fechar modal
	btnFechar.addEventListener("click", () => {
		modal.style.display = "none";
	});

	// enviar dados ao backend
	btnFinalizar.addEventListener("click", async () => {
		const nome = document.getElementById("nome").value.trim();
		const email = document.getElementById("email").value.trim();
		const senha = document.getElementById("senha").value.trim();
		const cpf = document.getElementById("cpf").value.trim();
		const rg = document.getElementById("rg").value.trim();
		const endereco = document.getElementById("endereco").value.trim();
		const curso = document.getElementById("curso").value.trim();

		if (!nome || !email || !senha) {
			alert("Preencha nome, email e senha.");
			return;
		}

		const aluno = {
			nome,
			email,
			senha,
			cpf,
			rg,
			endereco,
			curso,
			saldoMoedas: 0
		};

		try {
			const response = await fetch("http://localhost:5062/api/Alunos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(aluno)
			});

			if (response.ok) {
				alert("Cadastro realizado com sucesso!");
				modal.style.display = "none";
				document.getElementById("formCadastro").reset();
			} else {
				const error = await response.text();
				alert("Erro ao cadastrar: " + error);
			}
		} catch (err) {
			alert("Erro de conexão com o servidor: " + err.message);
		}
	});
});
