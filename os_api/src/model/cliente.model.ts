import { pool } from './db';

export const createClienteDB = async ({nome,email=null,telefone=null,endereco=null,id_empresa=null}) => {
  const query = `INSERT INTO cliente (nome,email,telefone,endereco,id_empresa) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const values = [nome,email,telefone,endereco,id_empresa];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteClienteDB = async (id) => {
  const query = `DELETE FROM cliente WHERE id=$1`;
  return await pool.query(query, [id]);
};

export const updateClienteDB = async (id,{nome,email,telefone,endereco,id_empresa}) => {
  const query = `UPDATE cliente SET nome=$1,email=$2,telefone=$3,endereco=$4,id_empresa=$5 WHERE id=$6 RETURNING *`;
  const values = [nome,email,telefone,endereco,id_empresa,id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getClienteByIdDB = async (id) => {
  const query = `SELECT * FROM cliente WHERE id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const getAllClientesDB = async () => {
  const query = `SELECT * FROM cliente ORDER BY data_cadastro DESC`;
  const result = await pool.query(query);
  return result.rows;
};
