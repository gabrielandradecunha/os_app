# SISTEMA DE ORDEM DE SERVIÇOS PARA EMPRESAS

![home](./imgs/home.png)

Este é um sistema de gerenciamento de Ordens de Serviços (O.S.), Empresas, Clientes e Usuários, desenvolvido em **Node.js** com **Express** escrito em **Typescript**, **React.js** no frontend e banco de dados **PostgreSQL**. 

---

## STACK

- React
- Node
- Typescript
- Express
- PostgreSQL
- Docker 
- JWT 

---

## FUNCIONALIDADES

Sistema com autenticação JWT que permite gerenciar usuários, empresas, clientes e ordens de serviço, incluindo cadastro, atualização, exclusão e listagem, com O.S. vinculadas a empresas e usuários.

---

## INSTALAÇÃO

```bash
# Clonando o repositório
git clone https://github.com/gabrielandradecunha/os_app
cd os_app/os_api

# Copiar o arquivo de exemplo de variáveis de ambiente
cp .env.example .env

# Gerar JWT e depois inserir no .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Iniciando o backend com Docker
sudo docker-compose up -d

# Instalando dependências
npm install

# Rodando o backend
node src/index.js

# front
cd os_app
npm install
npm run dev


