import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './EmpresaForm.css';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      setMensagem('Erro ao buscar usuários.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente deletar este usuário?')) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('Usuário deletado com sucesso!');
      fetchUsers(); // Atualiza a lista
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      setMensagem('Erro ao deletar usuário.');
    }
  };

  return (
    <div className="empresa-container">
      <Navbar />

      <h2>Usuários Cadastrados</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
