import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './model/db.js';

//arquivos de rotas
import userRouter from './routes/user.route.js';
import osRouter from './routes/os.route.js';
import clienteRouter from './routes/cliente.route.js';
import empresaRouter from './routes/empresa.route.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// rotas
app.use(userRouter);
app.use(osRouter);
app.use(clienteRouter);
app.use(empresaRouter);

app.listen(3000, async () => {
  try {
    await pool.connect();
    console.log('\nBanco conectado...');
  } catch (err) {
    console.error('Erro ao conectar no banco:', err.message);
  }

  console.log('Servidor rodando...\n');

  const routers = [userRouter, osRouter, clienteRouter, empresaRouter];
  routers.forEach((router) => {
    if (router.stack) {
      router.stack.forEach((layer) => {
        if (layer.route) {
          const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(', ');
          console.log(`[${methods}] -> ${layer.route.path}`);
        }
      });
    }
  });
});
