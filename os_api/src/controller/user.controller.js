import {
  createUserDB,
  deleteUserDB,
  updateUserDB,
  getUserByEmailDB,
  getAllUsersDB
} from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export async function createUser(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const existingUser = await getUserByEmailDB(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await createUserDB(nome, email, hashedPassword);

    res.status(201).json({ message: 'Usuário criado com sucesso.', user });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const user = await getUserByEmailDB(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT,
      { expiresIn: '8h' }
    );

    res.status(200).json({ message: 'Login realizado com sucesso.', token, id_user: user.id });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersDB();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserByEmailDB(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    let hashedPassword;
    if (senha) {
      hashedPassword = await bcrypt.hash(senha, 10);
    }

    const updatedUser = await updateUserDB(id, nome, email, hashedPassword);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário atualizado com sucesso.', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteUserDB(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
}
