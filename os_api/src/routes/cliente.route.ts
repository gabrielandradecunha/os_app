import express from 'express';
import { createCliente, deleteCliente, updateCliente, getClienteById, getAllClientes } from '../controller/cliente.controller';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/cliente', authMiddleware, createCliente);
router.get('/cliente/:id', authMiddleware, getClienteById);
router.put('/cliente/:id', authMiddleware, updateCliente);
router.delete('/cliente/:id', authMiddleware, deleteCliente);
router.get('/cliente', authMiddleware, getAllClientes);

export default router;
