import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginErrorResponse {
  error?: string;
}

interface LoginResponse {
  token: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:3000/login',
        { email, senha }
      );

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      const axiosError = err as AxiosError<LoginErrorResponse>;
      setError(axiosError.response?.data?.error ?? 'Erro ao conectar com a API.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
