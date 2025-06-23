import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/index';
import {
  EditMedicoDialog,
  DeleteMedicoDialog,
  AddMedicoDialog,
} from '../components/MedicosDialogs';
import { useAuth } from '../contexts/AuthContext';

// Componente para usuários do tipo paciente – acesso negado.
const PacienteContent = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <Typography variant="h4" color="error">
      Acesso Negado
    </Typography>
  </Box>
);

// Componente para usuários do tipo médico – mostra os dados do próprio médico, inclusive a senha.
const MedicoContent = ({ userId }) => {
  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/medicos/${userId}`)
      .then((response) => {
        setMedico(response.data);
      })
      .catch((error) => console.error('Erro ao buscar médico:', error))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <CircularProgress />;

  if (!medico)
    return (
      <Typography variant="body1" color="error">
        Médico não encontrado.
      </Typography>
    );

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Meu Perfil
      </Typography>
      <Typography>ID: {medico.id}</Typography>
      <Typography>Nome: {medico.nome}</Typography>
      <Typography>Email: {medico.email}</Typography>
      <Typography>Especialidade: {medico.especialidade}</Typography>
      <Typography>Telefone: {medico.telefone}</Typography>
      <Typography>Senha: {medico.senha}</Typography>
    </Box>
  );
};

// Componente para usuários do tipo admin – renderiza a lista completa de médicos com ações.
const AdminContent = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para os diálogos
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    especialidade: '',
    telefone: '',
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [medicoToDelete, setMedicoToDelete] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [newMedicoData, setNewMedicoData] = useState({
    nome: '',
    email: '',
    senha: '',
    especialidade: '',
    telefone: '',
  });

  useEffect(() => {
    api
      .get('/medicos')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMedicos(response.data);
        }
      })
      .catch((error) => console.error('Erro ao buscar médicos:', error))
      .finally(() => setLoading(false));
  }, []);

  // --- Funções de Edição ---
  const handleEdit = (medico) => {
    setSelectedMedico(medico);
    setFormData({
      nome: medico.nome,
      email: medico.email,
      senha: '',
      especialidade: medico.especialidade,
      telefone: medico.telefone,
    });
    setOpenEdit(true);
  };

  const handleEditSave = () => {
    const id = selectedMedico.id;
    api
      .put(`/medicos/${id}`, formData)
      .then(() => {
        setMedicos(medicos.map((m) => (m.id === id ? { ...m, ...formData } : m)));
        setOpenEdit(false);
        setSelectedMedico(null);
      })
      .catch((error) => console.error('Erro ao atualizar médico:', error));
  };

  // --- Funções de Deleção ---
  const handleDelete = (medico) => {
    setMedicoToDelete(medico);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = () => {
    const id = medicoToDelete.id;
    api
      .delete(`/medicos/${id}`)
      .then(() => {
        setMedicos(medicos.filter((m) => m.id !== id));
        setOpenDelete(false);
        setMedicoToDelete(null);
      })
      .catch((error) => console.error('Erro ao deletar médico:', error));
  };

  // --- Funções de Adição ---
  const handleAddOpen = () => {
    setNewMedicoData({
      nome: '',
      email: '',
      senha: '',
      especialidade: '',
      telefone: '',
    });
    setOpenAdd(true);
  };

  const handleAddSave = () => {
    api
      .post('/medicos', newMedicoData)
      .then((response) => {
        setMedicos([...medicos, response.data]);
        setOpenAdd(false);
      })
      .catch((error) => console.error('Erro ao criar médico:', error));
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Especialidade</strong>
              </TableCell>
              <TableCell>
                <strong>Telefone</strong>
              </TableCell>
              <TableCell align="right">
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Ações
                  </Typography>
                  <Fab size="small" color="primary" onClick={handleAddOpen} aria-label="add">
                    <AddIcon />
                  </Fab>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicos.map((medico) => (
              <TableRow key={medico.id}>
                <TableCell>{medico.id}</TableCell>
                <TableCell>{medico.nome}</TableCell>
                <TableCell>{medico.email}</TableCell>
                <TableCell>{medico.especialidade}</TableCell>
                <TableCell>{medico.telefone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(medico)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(medico)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogos importados */}
      <EditMedicoDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleEditSave}
        medico={selectedMedico}
        formData={formData}
        setFormData={setFormData}
      />
      <DeleteMedicoDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
        medico={medicoToDelete}
      />
      <AddMedicoDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAddSave}
        newMedicoData={newMedicoData}
        setNewMedicoData={setNewMedicoData}
      />
    </>
  );
};

const Medicos = () => {
  const { user } = useAuth(); // Agora chamado dentro de um componente
  
  if (!user) {
    return <CircularProgress />;
  }

  switch (user.tipo) {
    case 'paciente':
      return <PacienteContent />;
    case 'medico':
      return <MedicoContent userId={user.id} />;
    case 'admin':
    default:
      return <AdminContent />;
  }
};

export default Medicos;