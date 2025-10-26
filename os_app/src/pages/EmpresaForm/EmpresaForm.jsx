import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './EmpresaForm.css';

export default function EmpresaForm() {
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: '',
    id_user: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const token = localStorage.getItem('token');

  // Buscar empresas e usuários
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [empresasRes, usuariosRes] = await Promise.all([
          axios.get('http://localhost:3000/empresa', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setEmpresas(empresasRes.data);
        setUsuarios(usuariosRes.data);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    };
    fetchDados();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      await axios.post('http://localhost:3000/empresa', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('✅ Empresa cadastrada com sucesso!');
      setForm({
        nome: '',
        cnpj: '',
        telefone: '',
        email: '',
        endereco: '',
        id_user: ''
      });
      const response = await axios.get('http://localhost:3000/empresa', { headers: { Authorization: `Bearer ${token}` } });
      setEmpresas(response.data);
    } catch (err) {
      console.error('Erro ao cadastrar empresa:', err);
      setMensagem('❌ Erro ao cadastrar empresa.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente deletar esta empresa?')) return;

    try {
      await axios.delete(`http://localhost:3000/empresa/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('Empresa deletada com sucesso!');
      setEmpresas(empresas.filter(e => e.id !== id));
    } catch (err) {
      console.error('Erro ao deletar empresa:', err);
      setMensagem('Erro ao deletar empresa.');
    }
  };

  return (
    <div className="empresa-container">
      <form className="empresa-form" onSubmit={handleSubmit}>
        <a href="/home" className="voltar">Voltar</a>
        <h2>Cadastrar Empresa</h2>

        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da Empresa" required />
        <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="CNPJ" />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereço" />

        <select name="id_user" value={form.id_user} onChange={handleChange} required>
          <option value="">Selecione o Usuário Responsável</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nome}</option>
          ))}
        </select>

        <button type="submit">Salvar</button>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>

      <div className="empresa-list">
        <h2>Empresas Cadastradas</h2>
        {empresas.length === 0 ? (
          <p>Nenhuma empresa cadastrada.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Endereço</th>
                <th>Usuário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.nome}</td>
                  <td>{e.cnpj}</td>
                  <td>{e.telefone}</td>
                  <td>{e.email}</td>
                  <td>{e.endereco}</td>
                  <td>{usuarios.find(u => u.id === e.id_user)?.nome || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(e.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
