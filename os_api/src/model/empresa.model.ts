import { pool } from './db';

export const createEmpresaDB = async ({nome,cnpj=null,id_user=null,telefone=null,email=null,endereco=null}) => {
  const query = `INSERT INTO empresa (nome,cnpj,id_user,telefone,email,endereco) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const values = [nome,cnpj,id_user,telefone,email,endereco];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteEmpresaDB = async (id) => {
  const query = `DELETE FROM empresa WHERE id=$1`;
  return await pool.query(query, [id]);
};

export const updateEmpresaDB = async (id,{nome,cnpj,id_user,telefone,email,endereco}) => {
  const query = `UPDATE empresa SET nome=$1,cnpj=$2,id_user=$3,telefone=$4,email=$5,endereco=$6 WHERE id=$7 RETURNING *`;
  const values = [nome,cnpj,id_user,telefone,email,endereco,id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getEmpresaByIdDB = async (id) => {
  const query = `SELECT * FROM empresa WHERE id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const getAllEmpresasDB = async () => {
  const query = `SELECT * FROM empresa ORDER BY data_cadastro DESC`;
  const result = await pool.query(query);
  return result.rows;
};
