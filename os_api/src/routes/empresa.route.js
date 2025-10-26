import express from 'express';
import { createEmpresa, deleteEmpresa, updateEmpresa, getEmpresaById, getAllEmpresas } from '../controller/empresa.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/empresa', authMiddleware, createEmpresa);
router.get('/empresa/:id', authMiddleware, getEmpresaById);
router.put('/empresa/:id', authMiddleware, updateEmpresa);
router.delete('/empresa/:id', authMiddleware, deleteEmpresa);
router.get('/empresa', authMiddleware, getAllEmpresas);

export default router;
