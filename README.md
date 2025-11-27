# 💰 Sistema de Moeda Estudantil

O **Sistema de Moeda Estudantil** tem como objetivo promover o reconhecimento de mérito acadêmico por meio de uma moeda virtual. Professores podem distribuir moedas aos alunos como forma de incentivo, e os alunos podem trocá-las por produtos, descontos ou vantagens oferecidas por empresas parceiras. O sistema possibilita o cadastro de usuários (alunos, professores e empresas), o controle de saldo de moedas, o envio e recebimento de transações e o resgate de recompensas, tudo dentro de um ambiente seguro e moderno.

## 👥 Integrantes do Grupo

- Integrante 1 — *Arthur Candian De Azevedo Moia*
- Integrante 2 — *Luis Henrique Fantini Almeida*
- Integrante 3 — *Rafael de Oliveira Caldeira Lopes*

## 🧰 Tecnologias Utilizadas

O projeto será desenvolvido utilizando uma stack moderna que combina **frontend, backend, containerização, banco de dados relacional** e **testes automatizados**:

| Camada | Tecnologia | Descrição |
|:--|:--|:--|
| **Frontend** | React | Interface SPA para interação do usuário |
| **Backend** | .NET 8 API | Implementa as regras de negócio, autenticação e endpoints REST |
| **Banco de Dados** | MySQL | Armazena informações de alunos, professores, empresas e transações |
| **Containerização** | Docker | Isola e orquestra os serviços (frontend, backend e banco de dados) |
| **Testes** | xUnit | Framework de testes unitários utilizado no backend (.NET) |

## 📂 Estrutura de Pastas do Projeto

```
├── src
| ├── frontend
| └── backend
|   ├── Controllers
|   ├── DTOs
|   ├── Interfaces
|   ├── Migrations
|   ├── Models
|   ├── Profiles
|   ├── Repositories
|   └── Services
├── docs
│ ├── DiagramaCasosDeUso.png
│ ├── DiagramaDeClasses.png
│ └── DiagramaDeComponentes.png
└── README.md
```

## 🧩 Diagramas do Sistema

A modelagem inicial do sistema foi feita com base na arquitetura MVC e nos requisitos da Release 1, buscando representar a estrutura lógica e a interação entre os principais elementos do software.

### 1️⃣ Diagrama de Casos de Uso (`docs/DiagramaCasosDeUso.png`)
Representa as **funcionalidades principais do sistema** e como cada **ator** (Aluno, Professor e Empresa Parceira) interage com elas. Mostra casos como o envio de moedas, cadastro de vantagens e troca por recompensas.

### 2️⃣ Diagrama de Classes (`docs/DiagramaDeClasses.png`)
Descreve as **principais entidades do sistema** e seus **relacionamentos**, como `Aluno`, `Professor`, `Empresa`, `Transacao` e etc. Cada classe inclui seus atributos e métodos essenciais, refletindo a estrutura da camada de domínio.

### 3️⃣ Diagrama de Componentes (`docs/DiagramaDeComponentes.png`)
Mostra a **visão arquitetural** do sistema, incluindo os componentes **React (frontend)**, **.NET API (backend)** e o **MySQL (banco de dados)**, todos executando em **containers Docker**. Também representa o fluxo de comunicação entre os serviços e o uso de **JWT e HTTPS** para autenticação e segurança.

## 🧠 Histórias de Usuário

As histórias de usuário foram criadas para capturar as necessidades dos diferentes perfis que interagem com o sistema — alunos, professores e empresas parceiras.

### 1️⃣ Cadastro de Aluno  
**Como aluno**, quero realizar meu cadastro informando meus dados pessoais e escolhendo minha instituição, **para participar do sistema de mérito**.

### 2️⃣ Distribuição de Moedas  
**Como professor**, quero enviar moedas para alunos que se destacaram, **para reconhecer o mérito e incentivar o engajamento**.

### 3️⃣ Notificação de Recebimento  
**Como aluno**, quero receber um email quando ganhar moedas, **para ficar ciente dos meus reconhecimentos**.

### 4️⃣ Resgate de Vantagens  
**Como aluno**, quero trocar minhas moedas por produtos ou descontos, **para ser recompensado pelo meu desempenho**.

### 5️⃣ Gerenciamento de Vantagens  
**Como empresa parceira**, quero cadastrar produtos ou descontos com descrição, foto e custo em moedas, **para oferecer vantagens aos alunos**.

### 6️⃣ Controle de Saldo  
**Como professor**, quero consultar meu saldo de moedas, **para saber quanto ainda posso distribuir**.

### 7️⃣ Autenticação  
**Como usuário**, quero fazer login com meu email e senha, **para acessar as funcionalidades do sistema**.

###🚀 Como Rodar o Sistema

🐳 Backend – Docker Compose

O backend já está totalmente configurado para rodar em containers. Para iniciar tudo, basta ter o Docker e o Docker Compose instalados.

1. Abra o terminal na raiz do projeto (onde está o docker-compose.yml).
2. Execute o comando:

`docker compose up -d`

Esse comando irá:

Baixar as imagens necessárias (caso não existam localmente)

Criar os containers

Iniciar o backend em modo detached (em segundo plano)


Para verificar se tudo está rodando corretamente:

`docker compose ps`

Para desligar os containers:

docker compose down


---

🌐 Frontend – HTML Básico (VS Code)

O frontend é composto por arquivos HTML, CSS e JavaScript simples, então não precisa build, framework nem servidor complexo.

Para rodar:

1. Abra a pasta do frontend no VS Code.
2. Instale a extensão Live Server (Ritwick Dey).

Vá em Extensions (Ctrl+Shift+X) e pesquise “Live Server”.



3. Abra o arquivo index.html.


4. Clique em "Go Live" no canto inferior direito do VS Code.



Isso iniciará um servidor local, geralmente em:

`http://127.0.0.1:5500`

ou

`http://localhost:5500`

E o site já estará funcionando.
