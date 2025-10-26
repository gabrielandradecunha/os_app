import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Usuario não logado' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('Erro de autenticação:', err.message);
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
}
