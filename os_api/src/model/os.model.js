import { pool } from './db.js';

export const createOSDB = async ({numero,nome,tipo_produto,defeito,complemento,status=false,descricao,valor,id_cliente,id_tecnico=null,id_empresa=null,data_conclusao=null}) => {
  const query = `INSERT INTO os (numero,nome,tipo_produto,defeito,complemento,status,descricao,valor,id_cliente,id_tecnico,id_empresa,data_conclusao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;
  const values = [numero,nome,tipo_produto,defeito,complemento,status,descricao,valor,id_cliente,id_tecnico,id_empresa,data_conclusao];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteOSDB = async (id) => {
  const query = `DELETE FROM os WHERE id=$1`;
  return await pool.query(query, [id]);
};

export const updateOSDB = async (id,{numero,nome,tipo_produto,defeito,complemento,status,descricao,valor,id_cliente,id_tecnico,id_empresa,data_conclusao}) => {
  const query = `UPDATE os SET numero=$1,nome=$2,tipo_produto=$3,defeito=$4,complemento=$5,status=$6,descricao=$7,valor=$8,id_cliente=$9,id_tecnico=$10,id_empresa=$11,data_conclusao=$12 WHERE id=$13 RETURNING *`;
  const values = [numero,nome,tipo_produto,defeito,complemento,status,descricao,valor,id_cliente,id_tecnico,id_empresa,data_conclusao,id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getOSByIdDB = async (id) => {
  const query = `SELECT * FROM os WHERE id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const getAllOSDB = async () => {
  const query = `SELECT * FROM os ORDER BY data_emissao DESC`;
  const result = await pool.query(query);
  return result.rows;
};
