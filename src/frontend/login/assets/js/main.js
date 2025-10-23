/*=============== MOSTRAR/ESCONDER SENHA LOGIN ===============*/
const passwordAccess = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Muda senha pra texto
      input.type === 'password' ? input.type = 'text'
						              : input.type = 'password'

      // Muda icone
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordAccess('password','loginPassword')

/*=============== MOSTRAR/ESCONDER SENHA CRIAR CONTA ===============*/
const passwordRegister = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Muda senha pra texto
      input.type === 'password' ? input.type = 'text'
						              : input.type = 'password'

      // Muda icone
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordRegister('passwordCreate','loginPasswordCreate')

/*=============== MOSTRAR/ESCONDER LOGIN E CRIAR CONTA ===============*/
const loginAcessRegister = document.getElementById('loginAccessRegister'),
      buttonRegister = document.getElementById('loginButtonRegister'),
      buttonAccess = document.getElementById('loginButtonAccess')

buttonRegister.addEventListener('click', () => {
   loginAcessRegister.classList.add('active')
})

buttonAccess.addEventListener('click', () => {
   loginAcessRegister.classList.remove('active')
})

/*=============== FETCH DE CADASTRO ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const tipoSelect = document.getElementById("tipoCadastro");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tipo = tipoSelect.value;

    if (!tipo) {
      alert("Selecione o tipo de cadastro.");
      return;
    }

    // Campos comuns
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("emailCreate").value.trim();
    const senha = document.getElementById("passwordCreate").value.trim();

    let url = "";
    let bodyData = {};

    if (tipo === "aluno") {
      // Campos exclusivos do aluno
      const cpf = document.getElementById("cpf").value.trim();
      const rg = document.getElementById("rg").value.trim();
      const endereco = document.getElementById("enderecoAluno").value.trim();
      const curso = document.getElementById("curso").value.trim();

      url = "http://localhost:5000/api/aluno"; // ajuste conforme seu backend
      bodyData = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        rg: rg,
        endereco: endereco,
        curco: curso,
        saldoMoedas: 0 // inicializando saldo
      };
    } else if (tipo === "empresa") {
      // Campos exclusivos da empresa
      const cnpj = document.getElementById("cnpj").value.trim();
      const endereco = document.getElementById("enderecoEmpresa").value.trim();

      url = "http://localhost:5000/api/empresaParceira"; // ajuste conforme seu backend
      bodyData = {
        nome: nome,
        email: email,
        senha: senha,
        cnpj: cnpj,
        endereco: endereco
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        registerForm.reset();
        // esconder campos extras
        camposAluno.style.display = "none";
        camposEmpresa.style.display = "none";
      } else {
        const error = await response.text();
        alert("Erro ao cadastrar: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  });
});

/*=============== LOGIN SIMPLES VIA GET ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) return; // garante que o form existe na página

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (!email || !senha) {
      alert("Preencha o email e a senha.");
      return;
    }

    try {
      // busca alunos
      const alunosResponse = await fetch("http://localhost:5000/api/aluno");
      const alunos = await alunosResponse.json();

      // busca empresas
      const empresasResponse = await fetch("http://localhost:5000/api/empresaParceira");
      const empresas = await empresasResponse.json();

      // procura aluno ou empresa com o email e senha informados
      const aluno = alunos.find((a) => a.email === email && a.senha === senha);
      const empresa = empresas.find((e) => e.email === email && e.senha === senha);

      if (aluno) {
        alert(`Login bem-sucedido! Bem-vindo(a), ${aluno.nome} (Aluno).`);
        localStorage.setItem("usuario", JSON.stringify({ tipo: "aluno", ...aluno }));
        window.location.href = "dashboard.html";
      } else if (empresa) {
        alert(`Login bem-sucedido! Bem-vindo(a), ${empresa.nome} (Empresa Parceira).`);
        localStorage.setItem("usuario", JSON.stringify({ tipo: "empresa", ...empresa }));
        window.location.href = "dashboard.html";
      } else {
        alert("Email ou senha inválidos.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  });
});