import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Home.css';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [ordens, setOrdens] = useState([]);
  const [erro, setErro] = useState('');

  const token = localStorage.getItem('token');

  // Buscar usuários
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(response.data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      setErro('Erro ao carregar usuários.');
    }
  };

  // Buscar Ordens de Serviço
  const fetchOrdens = async () => {
    try {
      const response = await axios.get('http://localhost:3000/os', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdens(response.data);
    } catch (err) {
      console.error('Erro ao buscar O.S.:', err);
      setErro('Erro ao carregar Ordens de Serviço.');
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchOrdens();
  }, []);

  // Deletar usuário
  const handleDeleteUsuario = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(usuarios.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      setErro('Não foi possível deletar o usuário.');
    }
  };

  // Deletar O.S.
  const handleDeleteOS = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta O.S.?')) return;

    try {
      await axios.delete(`http://localhost:3000/os/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdens(ordens.filter((o) => o.id !== id));
    } catch (err) {
      console.error('Erro ao deletar O.S.:', err);
      setErro('Não foi possível deletar a O.S.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Bem-vindo!</h1>
        {erro && <p className="erro">{erro}</p>}

        {/* Tabela de Usuários */}
        <section className="table-section">
          <h2>Usuários do Sistema</h2>
          {usuarios.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDeleteUsuario(u.id)}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </section>

        {/* Tabela de Ordens de Serviço */}
        <section className="table-section">
          <h2>Ordens de Serviço</h2>
          {ordens.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Defeito</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {ordens.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.numero}</td>
                    <td>{o.nome}</td>
                    <td>{o.tipo_produto}</td>
                    <td>{o.defeito}</td>
                    <td>{o.descricao}</td>
                    <td>{o.valor}</td>
                    <td>{o.status ? 'Concluída' : 'Aberta'}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDeleteOS(o.id)}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhuma O.S. encontrada.</p>
          )}
        </section>
      </div>
    </div>
  );
}
