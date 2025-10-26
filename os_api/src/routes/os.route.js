import express from 'express';
import { createOS, deleteOS, updateOS, getOSById, getAllOS } from '../controller/os.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/os', authMiddleware, createOS);
router.get('/os/:id', authMiddleware, getOSById);
router.put('/os/:id', authMiddleware, updateOS);
router.delete('/os/:id', authMiddleware, deleteOS);
router.get('/os', authMiddleware, getAllOS); 

export default router;
