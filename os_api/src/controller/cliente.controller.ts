import { createClienteDB, deleteClienteDB, updateClienteDB, getClienteByIdDB, getAllClientesDB } from '../model/cliente.model';

export async function createCliente(req, res) {
  try {
    const cliente = await createClienteDB(req.body);
    res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
  } catch (err) {
    console.error('Erro no createCliente:', err.message);
    res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
}

export async function deleteCliente(req, res) {
  const { id } = req.params;
  try {
    await deleteClienteDB(id);
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    console.error('Erro no deleteCliente:', err.message);
    res.status(500).json({ error: 'Erro ao deletar cliente.' });
  }
}

export async function updateCliente(req, res) {
  const { id } = req.params;
  try {
    const cliente = await updateClienteDB(id, req.body);
    res.json({ message: 'Cliente atualizado com sucesso', cliente });
  } catch (err) {
    console.error('Erro no updateCliente:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
}

export async function getClienteById(req, res) {
  const { id } = req.params;
  try {
    const cliente = await getClienteByIdDB(id);
    if (cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });
    res.json(cliente);
  } catch (err) {
    console.error('Erro no getClienteById:', err.message);
    res.status(500).json({ error: 'Erro ao buscar cliente.' });
  }
}

export async function getAllClientes(req, res) {
  try {
    const clientes = await getAllClientesDB();
    res.json(clientes);
  } catch (err) {
    console.error('Erro no getAllClientes:', err.message);
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
}
