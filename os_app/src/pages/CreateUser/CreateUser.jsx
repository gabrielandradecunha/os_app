import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';

export default function CreateUser() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      await axios.post(
        'http://localhost:3000/users',
        { nome, email, senha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSucesso('Usuário criado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      setErro(err.response?.data.error || 'Erro ao criar usuário.');
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '50px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>Criar Usuário</h1>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
          >
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px' }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px' }}
            />
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
