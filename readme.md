📋 Sistema de Clientes e Pedidos (React Native + Node.js + MySQL)

Este projeto é uma aplicação completa para cadastro de clientes e pedidos.
Ele foi desenvolvido em React Native (Expo) para o frontend e Node.js + Express + MySQL para o backend (API).

📂 Estrutura do Projeto
app/
│── api/              # Backend (Node.js + Express + MySQL)
│   ├── index.js      # Arquivo principal da API
│   ├── routes/       # Rotas da API (clientes e pedidos)
│   ├── sql/          # Scripts SQL para criar o banco e tabelas
│   └── package.json
│
│── App.js            # Frontend principal (React Native)
│── package.json      # Dependências do projeto mobile
└── README.md

🚀 Tecnologias

Frontend: React Native (Expo), Axios

Backend: Node.js, Express

Banco de Dados: MySQL

⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

Node.js
 (>= 18.x)

MySQL

Expo CLI

🛠️ Configuração do Banco de Dados

Abra o MySQL e crie o banco de dados usando o script:

SOURCE C:/Users/SEU_USUARIO/app/api/sql/schema.sql;


⚠️ Ajuste o caminho conforme sua máquina.

O script cria as tabelas clientes e pedidos, com vínculo entre elas.

▶️ Como Rodar
🔹 Backend (API)
cd app/api
npm install
node index.js


A API rodará em:
👉 http://localhost:3000

🔹 Frontend (Mobile)
cd app
npm install
npx expo start


Para rodar no Android: a

Para rodar no iOS (Mac): i

Para rodar no navegador: w

📱 Funcionalidades

Cadastro de clientes com verificação de email único

Cadastro de pedidos vinculados ao cliente

Exibição de pedidos em lista (FlatList) com:

Nome do cliente

Email

Descrição do pedido

Valor do pedido

Data/Hora de cadastro

📸 Layout Atual

Formulário para cadastrar cliente + pedido

Lista rolável de pedidos já cadastrados

Mensagens de feedback estilizadas (sucesso/erro)

📌 Melhorias Futuras

Separar telas: Cadastro e Lista de Pedidos (React Navigation)

Adicionar edição e exclusão de pedidos

Implementar autenticação de usuários

👨‍💻 Autor: Abel Braga

Desenvolvido como parte da unidade curricular Desenvolvimento em React Native
Instrutor: Marcio Schoenfelder
Curso: +DEVS2BLU
