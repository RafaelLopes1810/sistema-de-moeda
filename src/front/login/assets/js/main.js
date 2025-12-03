/*=============== MOSTRAR/ESCONDER SENHA LOGIN ===============*/
const passwordAccess = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye)

  iconEye.addEventListener('click', () => {
    // Muda senha pra texto
    input.type === 'password' ? input.type = 'text'
      : input.type = 'password'

    // Muda icone
    iconEye.classList.toggle('ri-eye-fill')
    iconEye.classList.toggle('ri-eye-off-fill')
  })
}
passwordAccess('password', 'loginPassword')

/*=============== MOSTRAR/ESCONDER SENHA CRIAR CONTA ===============*/
const passwordRegister = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye)

  iconEye.addEventListener('click', () => {
    // Muda senha pra texto
    input.type === 'password' ? input.type = 'text'
      : input.type = 'password'

    // Muda icone
    iconEye.classList.toggle('ri-eye-fill')
    iconEye.classList.toggle('ri-eye-off-fill')
  })
}
passwordRegister('passwordCreate', 'loginPasswordCreate')

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

      url = "http://localhost:5000/api/aluno";
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

      url = "http://localhost:5000/api/empresaParceira";
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

/*=============== TESTE DE CADASTRO ===============*/
const ALUNOS_MOCK = [
  {
    email: "rafaeldeoliveiracl@gmail.com",
    senha: "123",
    nome: "Rafael Lopes",
    cpf: "14440020666",
    curso: "Engenharia de Software",
    saldoMoedas: 1000,
    tipo: "aluno"
  },
  {
    email: "acandian15@gmail.com",
    senha: "123",
    nome: "Arthur Candian",
    cpf: "15208514648",
    curso: "Engenharia de Software",
    saldoMoedas: 1500,
    tipo: "aluno"
  },
  {
    email: "luishfantini@gmail.com",
    senha: "123",
    nome: "Luis Fantini",
    cpf: "11111111111",
    curso: "Engenharia de Software",
    saldoMoedas: 800,
    tipo: "aluno"
  }
];

const EMPRESA_MOCK = [
  {
    email: "empresa1@gmail.com",
    senha: "123"
  }
]

/*=============== LOGIN ===============*/
const USER_ATUAL_KEY = "moeda_user_atual";

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const senhaInput = document.getElementById("password").value.trim();

  const alunoEncontrado = ALUNOS_MOCK.find(
    (u) => u.email === emailInput && u.senha === senhaInput
  );

  if (!alunoEncontrado) {
    alert("Email ou senha incorretos!");
    return;
  }

  // ====== NOVO: inicializar histórico/saldo/resgates se não existir ======
  if (!Array.isArray(alunoEncontrado.historico)) {
    alunoEncontrado.historico = [];
  }

  if (typeof alunoEncontrado.saldo !== "number") {
    alunoEncontrado.saldo = 0;
  }

  if (!Array.isArray(alunoEncontrado.resgates)) {
    alunoEncontrado.resgates = [];
  }
  // =====================================================================

  localStorage.setItem(USER_ATUAL_KEY, JSON.stringify(alunoEncontrado));

  window.location.href = "telaInicial/telaInicial.html";
});
