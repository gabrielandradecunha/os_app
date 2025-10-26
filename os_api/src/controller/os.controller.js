import { createOSDB, deleteOSDB, updateOSDB, getOSByIdDB, getAllOSDB } from '../model/os.model.js';

export async function createOS(req, res) {
  try {
    const os = await createOSDB(req.body);
    res.status(201).json({ message: 'O.S. criada com sucesso', os });
  } catch (err) {
    console.error('Erro no createOS:', err.message);
    res.status(500).json({ error: 'Erro ao criar O.S.' });
  }
}

export async function deleteOS(req, res) {
  const { id } = req.params;
  try {
    await deleteOSDB(id);
    res.json({ message: 'O.S. deletada com sucesso' });
  } catch (err) {
    console.error('Erro no deleteOS:', err.message);
    res.status(500).json({ error: 'Erro ao deletar O.S.' });
  }
}

export async function updateOS(req, res) {
  const { id } = req.params;
  try {
    const os = await updateOSDB(id, req.body);
    res.json({ message: 'O.S. atualizada com sucesso', os });
  } catch (err) {
    console.error('Erro no updateOS:', err.message);
    res.status(500).json({ error: 'Erro ao atualizar O.S.' });
  }
}

export async function getOSById(req, res) {
  const { id } = req.params;
  try {
    const os = await getOSByIdDB(id);
    if (os) {
      return res.status(404).json({ message: 'O.S. não encontrada.' });
    }
    res.json(os);
  } catch (err) {
    console.error('Erro no getOSById:', err.message);
    res.status(500).json({ error: 'Erro ao buscar O.S.' });
  }
}

export async function getAllOS(req, res) {
  try {
    const osList = await getAllOSDB();
    res.json(osList);
  } catch (err) {
    console.error('Erro no getAllOS:', err.message);
    res.status(500).json({ error: 'Erro ao buscar O.S.' });
  }
}
