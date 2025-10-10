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
