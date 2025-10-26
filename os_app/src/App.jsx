import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import OsForm from './pages/OsForm/OsForm.jsx';
import EmpresaForm from './pages/EmpresaForm/EmpresaForm.jsx';
import CreateUser from './pages/CreateUser/CreateUser.jsx';
import ClienteForm from './pages/ClienteForm/ClienteForm.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/os" element={<OsForm />} />
        <Route path="/empresaform" element={<EmpresaForm />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/cliente" element={<ClienteForm />} />
      </Routes>
    </BrowserRouter>
  );
}
