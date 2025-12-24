import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface OrdemServico {
  id: number;
  numero: string;
  nome: string;
  tipo_produto: string;
  defeito: string;
  descricao: string;
  valor: number;
  status: boolean;
}

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [erro, setErro] = useState<string>('');

  const token = localStorage.getItem('token');

  const fetchUsuarios = async (): Promise<void> => {
    try {
      const response = await axios.get<Usuario[]>('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(response.data);
    } catch {
      setErro('Erro ao carregar usuários.');
    }
  };

  const fetchOrdens = async (): Promise<void> => {
    try {
      const response = await axios.get<OrdemServico[]>('http://localhost:3000/os', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrdens(response.data);
    } catch {
      setErro('Erro ao carregar Ordens de Serviço.');
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchOrdens();
  }, []);

  const handleDeleteUsuario = async (id: number): Promise<void> => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch {
      setErro('Não foi possível deletar o usuário.');
    }
  };

  const handleDeleteOS = async (id: number): Promise<void> => {
    if (!window.confirm('Tem certeza que deseja deletar esta O.S.?')) return;

    try {
      await axios.delete(`http://localhost:3000/os/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrdens(prev => prev.filter(o => o.id !== id));
    } catch {
      setErro('Não foi possível deletar a O.S.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Bem-vindo!</h1>
        {erro && <p className="erro">{erro}</p>}

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
                {usuarios.map(u => (
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
                {ordens.map(o => (
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
