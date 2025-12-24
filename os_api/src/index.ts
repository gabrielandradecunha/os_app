import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './model/db';
import userRouter from './routes/user.route';
import osRouter from './routes/os.route';
import clienteRouter from './routes/cliente.route';
import empresaRouter from './routes/empresa.route';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(osRouter);
app.use(clienteRouter);
app.use(empresaRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log('\nBanco conectado...');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Erro ao conectar no banco:', err.message);
    } else {
      console.error('Erro ao conectar no banco:', err);
    }
  }

  console.log(`Servidor rodando na porta ${PORT}...\n`);
  const routers = [userRouter, osRouter, clienteRouter, empresaRouter];

  routers.forEach(router => {
    (router as any).stack?.forEach((layer: any) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods)
          .map(m => m.toUpperCase())
          .join(', ');

        console.log(`[${methods}] -> ${layer.route.path}`);
      }
    });
  });
});
