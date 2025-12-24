import { createEmpresaDB, deleteEmpresaDB, updateEmpresaDB, getEmpresaByIdDB, getAllEmpresasDB } from '../model/empresa.model';

export async function createEmpresa(req, res) {
  try {
    const empresa = await createEmpresaDB(req.body);
    res.status(201).json({ message: 'Empresa criada com sucesso!', empresa });
  } catch (err) {
    console.error('Erro no createEmpresa:', err.message);
    res.status(500).json({ error: 'Erro ao criar empresa.' });
  }
}

export async function deleteEmpresa(req, res) {
  const { id } = req.params;
  try {
    await deleteEmpresaDB(id);
    res.json({ message: 'Empresa deletada com sucesso!' });
  } catch (err) {
    console.error('Erro no deleteEmpresa:', err.message);
    res.status(500).json({ error: 'Erro ao deletar empresa.' });
  }
}

export async function updateEmpresa(req, res) {
  const { id } = req.params;
  try {
    const empresa = await updateEmpresaDB(id, req.body);
    res.json({ message: 'Empresa atualizada com sucesso!', empresa });
  } catch (err) {
    console.error('Erro no updateEmpresa:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar empresa.' });
  }
}

export async function getEmpresaById(req, res) {
  const { id } = req.params;
  try {
    const empresa = await getEmpresaByIdDB(id);
    if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada.' });
    res.json(empresa);
  } catch (err) {
    console.error('Erro no getEmpresaById:', err.message);
    res.status(500).json({ error: 'Erro ao buscar empresa.' });
  }
}

export async function getAllEmpresas(req, res) {
  try {
    const empresas = await getAllEmpresasDB();
    res.json(empresas);
  } catch (err) {
    console.error('Erro no getAllEmpresas:', err.message);
    res.status(500).json({ error: 'Erro ao buscar empresas.' });
  }
}
