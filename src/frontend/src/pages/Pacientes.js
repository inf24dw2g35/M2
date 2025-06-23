// src/components/Pacientes.jsx
import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Fab,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/index';
import {
  EditPacienteDialog,
  DeletePacienteDialog,
  AddPacienteDialog,
} from '../components/PacientesDialogs';
import { useAuth } from '../contexts/AuthContext';

// Função para formatar a data (yyyy-mm-dd)
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Retorna o original se não for data válida
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Componente para usuários do tipo "paciente" que deve exibir o próprio perfil.
// Nota: Se existir uma API específica para buscar apenas um paciente (ex. GET /pacientes/{id}),
// use-a no lugar de filtrar a lista completa.
const PacienteProfileContent = ({ userId }) => {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    api
      .get(`/pacientes/${userId}`)
      .then((response) => {
        setPaciente(response.data);
      })
      .catch((error) => console.error('Erro ao buscar paciente:', error))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <CircularProgress />;

  if (!paciente)
    return (
      <Typography variant="body1" color="error">
        Paciente não encontrado.
      </Typography>
    );

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Meu Perfil
      </Typography>
      <Typography>ID: {paciente.id}</Typography>
      <Typography>Nome: {paciente.nome}</Typography>
      <Typography>Email: {paciente.email}</Typography>
      <Typography>Data de Nascimento: {formatDate(paciente.data_nascimento)}</Typography>
      <Typography>Telefone: {paciente.telefone}</Typography>
      <Typography>Senha: {paciente.senha}</Typography>
    </Box>
  );
};

// Componente para usuários do tipo "admin" – renderiza a tabela completa de pacientes.
// Os dialogs para edição e inclusão serão implementados futuramente.
const AdminContent = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para os diálogos
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    data_nascimento: '',
    telefone: '',
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [pacienteToDelete, setPacienteToDelete] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [newPacienteData, setNewPacienteData] = useState({
    nome: '',
    email: '',
    senha: '',
    data_nascimento: '',
    telefone: '',
  });

  useEffect(() => {
    api
      .get('/pacientes')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPacientes(response.data);
        }
      })
      .catch((error) => console.error('Erro ao buscar pacientes:', error))
      .finally(() => setLoading(false));
  }, []);

  // --- Funções de Edição ---
  const handleEdit = (paciente) => {
    setSelectedPaciente(paciente);
    setFormData({
      nome: paciente.nome,
      email: paciente.email,
      senha: '',
      data_nascimento: paciente.data_nascimento,
      telefone: paciente.telefone,
    });
    setOpenEdit(true);
  };

  const handleEditSave = () => {
    if (!formData.nome || !formData.email) {
      alert('Nome e email são obrigatórios!');
      return;
    }

    const id = selectedPaciente.id;
    const dataToSend = {
      ...formData,
      data_nascimento: formatDate(formData.data_nascimento)
    };

    api
      .put(`/pacientes/${id}`, dataToSend)
      .then((response) => {
        setPacientes(pacientes.map((p) => 
          p.id === id ? { ...p, ...response.data } : p
        ));
        setOpenEdit(false);
      })
      .catch((error) => {
        console.error('Erro ao atualizar paciente:', error);
        alert('Erro ao atualizar paciente. Verifique os dados e tente novamente.');
      });
  };

  // --- Funções de Deleção ---
  const handleDelete = (paciente) => {
    setPacienteToDelete(paciente);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = () => {
    const id = pacienteToDelete.id;
    api
      .delete(`/pacientes/${id}`)
      .then(() => {
        setPacientes(pacientes.filter((p) => p.id !== id));
        setOpenDelete(false);
        setPacienteToDelete(null);
      })
      .catch((error) => console.error('Erro ao deletar paciente:', error));
  };

  // --- Funções de Adição ---
  const handleAddOpen = () => {
    setNewPacienteData({
      nome: '',
      email: '',
      senha: '',
      data_nascimento: '',
      telefone: '',
    });
    setOpenAdd(true);
  };

  const handleAddSave = () => {
    api
      .post('/pacientes', newPacienteData)
      .then((response) => {
        setPacientes([...pacientes, response.data]);
        setOpenAdd(false);
      })
      .catch((error) => console.error('Erro ao criar paciente:', error));
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
                <strong>Data de Nascimento</strong>
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
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell>{paciente.id}</TableCell>
                <TableCell>{paciente.nome}</TableCell>
                <TableCell>{paciente.email}</TableCell>
                <TableCell>{formatDate(paciente.data_nascimento)}</TableCell>
                <TableCell>{paciente.telefone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(paciente)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(paciente)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogos importados - você precisará criar versões para pacientes */}
      <EditPacienteDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleEditSave}
        paciente={selectedPaciente}
        formData={formData}
        setFormData={setFormData}
      />
      <DeletePacienteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
        paciente={pacienteToDelete}
      />
      <AddPacienteDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAddSave}
        newPacienteData={newPacienteData}
        setNewPacienteData={setNewPacienteData}
      />
    </>
  );
};

// Componente principal que decide qual conteúdo renderizar baseado no tipo do usuário autenticado.
const Pacientes = () => {
  const { user } = useAuth();

  if (!user) return <CircularProgress />;

  switch (user.tipo) {
    case 'paciente':
      return <PacienteProfileContent userId={user.id} />;
    case 'medico':
    case 'admin':
    default:
      return <AdminContent />;
  }
};

export default Pacientes;
