# SISTEMA DE ORDEM DE SERVIÇOS PARA EMPRESAS

![home](./imgs/home.png)

Este é um sistema de gerenciamento de Ordens de Serviços (O.S.), Empresas, Clientes e Usuários, desenvolvido em **Node.js** com **Express**, **React.js** no frontend e banco de dados **PostgreSQL**. 

---

## STACK

- React.js
- Node.js
- Express.js
- PostgreSQL
- Docker (opcional)
- JWT para autenticação
- bcrypt para hash de senhas
- Axios para requisições HTTP
- React Router para navegação
- Context API para gerenciamento de estado global

---

## FUNCIONALIDADES

- **Usuários**: Cadastro de usuários, login e autenticação via JWT, atualização e exclusão de usuários.
- **Empresas**: Cadastro, atualização, exclusão e listagem de empresas.
- **Clientes**: Cadastro, atualização, exclusão e listagem de clientes.
- **Ordens de Serviço**: Cadastro, atualização, exclusão e listagem de O.S, associadas a empresas e usuários.

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


