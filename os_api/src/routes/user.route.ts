import express from 'express';
import { createUser, deleteUser, updateUser, getUser, login, getAllUsers } from '../controller/user.controller';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

//rota publica para login
router.post('/login', login);

//rota publica para criar usuarios
router.post('/users', createUser);

// rotas para usuarios autenticados
router.get('/users/:id', authMiddleware, getUser);
router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
