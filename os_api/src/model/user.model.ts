import { pool } from './db';
import bcrypt from "bcrypt";

export async function createUserDB(nome, email, senha) {
    const senhaHash = await bcrypt.hash(senha, 10);
    try {
        const query = `INSERT INTO "user" (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [nome, email, senhaHash]);
        console.log("Usuario cadastrado");
        return result.rows[0];
    } catch (err) {
        console.log('Erro no createUser:', err.message);
        throw err; 
    }
}


export async function deleteUserDB(id) {
    try{
        const query = `DELETE FROM "user" WHERE id = $1`;
        console.log("Usuario deletado");
        return pool.query(query, [id]);
    }catch(err){
        console.log(err.message);
    }
}

export async function updateUserDB(id, nome, email, senha) {
  const query = `UPDATE "user" SET nome=$1, email=$2, senha_hash=$3 WHERE id=$4`;
  return pool.query(query, [nome, email, senha, id]);
}


export async function getUserByEmailDB(email) {
  const query = `SELECT * FROM "user" WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0]; 
}

export const getAllUsersDB = async () => {
  const query = `SELECT id, nome, email, data_registro, ativo FROM "user" ORDER BY data_registro DESC`;
  const result = await pool.query(query);
  return result.rows;
};
