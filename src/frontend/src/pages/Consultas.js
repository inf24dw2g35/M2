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
  Typography,
  Fab,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/index';
import {
  EditConsultaDialog,
  DeleteConsultaDialog,
  AddConsultaDialog,
} from '../components/ConsultasDialogs';
import { useAuth } from '../contexts/AuthContext';

function formatarDataHora(dataISO) {
  // Remove o 'T' e tudo após o ponto (incluindo o .000Z)
  return dataISO.replace('T', ' ').replace(/\..+/, '');
}

// Componente para usuários do tipo paciente – acesso negado.
const PacienteContent = ({ userId }) => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`pacientes/${ userId }/consultas`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setConsultas(response.data);
        }
      })
      .catch((error) => console.error('Erro ao buscar consultas:', error))
      .finally(() => setLoading(false));
  }, []);

  

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
                <strong>Paciente ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nome paciente</strong>
              </TableCell>
              <TableCell>
                <strong>Medico ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nome medico</strong>
              </TableCell>
              <TableCell>
                <strong>Data e Hora</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultas.map((consulta) => (
              <TableRow key={consulta.consulta_id}>
                <TableCell>{consulta.consulta_id}</TableCell>
                <TableCell>{consulta.paciente_id}</TableCell>
                <TableCell>{consulta.nome_paciente}</TableCell>
                <TableCell>{consulta.medico_id}</TableCell>
                <TableCell>{consulta.nome_medico}</TableCell>
                <TableCell>{formatarDataHora(consulta.data_hora)}</TableCell>
                <TableCell>{consulta.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// Componente para usuários do tipo admin – renderiza a lista completa de consultas com ações.
const AdminContent = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para os diálogos
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [formData, setFormData] = useState({
    paciente_id: '',
    medico_id: '',
    data_hora: '',
    status: ''
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [consultaToDelete, setConsultaToDelete] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [newConsultaData, setNewConsultaData] = useState({
    paciente_id: '',
    medico_id: '',
    data_hora: '',
    status: ''
  });

  useEffect(() => {
    api
      .get('/consultas')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setConsultas(response.data);
        }
      })
      .catch((error) => console.error('Erro ao buscar consultas:', error))
      .finally(() => setLoading(false));
  }, []);

  // --- Funções de Edição ---
  const handleEdit = (consulta) => {
    setSelectedConsulta(consulta);
    setFormData({
      paciente_id: consulta.paciente_id,
      medico_id: consulta.medico_id,
      data_hora: formatarDataHora(consulta.data_hora),
      status: consulta.status
    });
    setOpenEdit(true);
  };

  const handleEditSave = () => {
    const id = selectedConsulta.id;
    api
      .put(`/consultas/${id}`, formData)
      .then(() => {
        setConsultas(consultas.map((c) => (c.id === id ? { ...c, ...formData } : c)));
        setOpenEdit(false);
        setSelectedConsulta(null);
      })
      .catch((error) => console.error('Erro ao atualizar consulta:', error));
  };

  // --- Funções de Deleção ---
  const handleDelete = (consulta) => {
    setConsultaToDelete(consulta);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = () => {
    const id = consultaToDelete.id;
    api
      .delete(`/consultas/${id}`)
      .then(() => {
        setConsultas(consultas.filter((c) => c.id !== id));
        setOpenDelete(false);
        setConsultaToDelete(null);
      })
      .catch((error) => console.error('Erro ao deletar consulta:', error));
  };

  // --- Funções de Adição ---
  const handleAddOpen = () => {
    setNewConsultaData({
      paciente_id: '',
      medico_id: '',
      data_hora: '',
      status: ''
    });
    setOpenAdd(true);
  };

  const handleAddSave = () => {
    api
      .post('/consultas', newConsultaData)
      .then((response) => {
        setConsultas([...consultas, response.data]);
        setOpenAdd(false);
      })
      .catch((error) => console.error('Erro ao criar consulta:', error));
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Paciente ID</strong></TableCell>
              <TableCell><strong>Nome paciente</strong></TableCell>
              <TableCell><strong>Médico ID</strong></TableCell>
              <TableCell><strong>Nome médico</strong></TableCell>
              <TableCell><strong>Data e Hora</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
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
            {consultas.map((consulta) => (
              <TableRow key={consulta.id}>
                <TableCell>{consulta.id}</TableCell>
                <TableCell>{consulta.paciente_id}</TableCell>
                <TableCell>{consulta.paciente}</TableCell>
                <TableCell>{consulta.medico_id}</TableCell>
                <TableCell>{consulta.medico}</TableCell>
                <TableCell>{formatarDataHora(consulta.data_hora)}</TableCell>
                <TableCell>{consulta.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(consulta)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(consulta)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogos importados */}
      <EditConsultaDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleEditSave}
        consulta={selectedConsulta}
        formData={formData}
        setFormData={setFormData}
      />
      <DeleteConsultaDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
        consulta={consultaToDelete}
      />
      <AddConsultaDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAddSave}
        newConsultaData={newConsultaData}
        setNewConsultaData={setNewConsultaData}
      />
    </>
  );
};

const Consultas = () => {
  const { user } = useAuth(); // Agora chamado dentro de um componente
  
  if (!user) {
    return <CircularProgress />;
  }

  switch (user.tipo) {
    case 'paciente':
      return <PacienteContent userId={user.id} />;
    case 'medico':
    case 'admin':
    default:
      return <AdminContent />;
  }
};

export default Consultas;