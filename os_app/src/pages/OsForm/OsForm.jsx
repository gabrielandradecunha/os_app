import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './OsForm.css';

export default function OsForm() {
  const [form, setForm] = useState({
    nome: '',
    numero: '',
    tipo_produto: '',
    defeito: '',
    complemento: '',
    descricao: '',
    valor: '',
    id_cliente: '',
    id_tecnico: '',
    id_empresa: '',
    status: false
  });

  const [mensagem, setMensagem] = useState('');
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [clientesRes, usuariosRes, empresasRes] = await Promise.all([
          axios.get('http://localhost:3000/cliente', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:3000/empresa', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setClientes(clientesRes.data);
        setUsuarios(usuariosRes.data);
        setEmpresas(empresasRes.data);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchDados();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newForm = { ...form, [name]: type === 'checkbox' ? checked : value };
    if (name === 'id_cliente') {
      const clienteSelecionado = clientes.find(c => c.id === parseInt(value));
      if (clienteSelecionado) newForm.nome = clienteSelecionado.nome;
    }
    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      await axios.post('http://localhost:3000/os', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('✅ Ordem de Serviço criada com sucesso!');
      setForm({
        nome: '',
        numero: '',
        tipo_produto: '',
        defeito: '',
        complemento: '',
        descricao: '',
        valor: '',
        id_cliente: '',
        id_tecnico: '',
        id_empresa: '',
        status: false
      });
    } catch (err) {
      console.error('Erro ao criar O.S.:', err);
      setMensagem('❌ Erro ao criar Ordem de Serviço.');
    }
  };

  return (
    <div className="os-container">
      <form className="os-form" onSubmit={handleSubmit}>
        <a href="/home" className="voltar">Voltar</a>
        <h2>Cadastrar Ordem de Serviço</h2>

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome da O.S."
          required
        />

        <input
          name="numero"
          value={form.numero}
          onChange={handleChange}
          placeholder="Número da O.S."
          required
        />

        <select name="id_cliente" value={form.id_cliente} onChange={handleChange} required>
          <option value="">Selecione o Cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <select name="id_tecnico" value={form.id_tecnico} onChange={handleChange} required>
          <option value="">Selecione o Técnico</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nome}</option>
          ))}
        </select>

        <select name="id_empresa" value={form.id_empresa} onChange={handleChange}>
          <option value="">Selecione a Empresa</option>
          {empresas.map(e => (
            <option key={e.id} value={e.id}>{e.nome}</option>
          ))}
        </select>

        <input
          name="tipo_produto"
          value={form.tipo_produto}
          onChange={handleChange}
          placeholder="Tipo do Produto"
        />

        <textarea
          name="defeito"
          value={form.defeito}
          onChange={handleChange}
          placeholder="Defeito informado"
        />

        <textarea
          name="complemento"
          value={form.complemento}
          onChange={handleChange}
          placeholder="Complemento"
        />

        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descrição do Serviço"
          required
        />

        <input
          type="number"
          step="0.01"
          name="valor"
          value={form.valor}
          onChange={handleChange}
          placeholder="Valor (R$)"
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
          />
          Concluída
        </label>

        <button type="submit">Salvar</button>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
    </div>
  );
}
