// src/models/PacienteDialogs.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';

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

export const EditPacienteDialog = ({
  open,
  onClose,
  onSave,
  paciente,
  formData,
  setFormData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Paciente</DialogTitle>
      <DialogContent>
        {paciente && (
          <>
            <TextField
              margin="dense"
              label="ID"
              fullWidth
              value={paciente.id}
              disabled
            />
            <TextField
              margin="dense"
              label="Nome"
              fullWidth
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Senha"
              type="password"
              fullWidth
              value={formData.senha}
              onChange={(e) =>
                setFormData({ ...formData, senha: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Data de Nascimento"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formatDate(formData.data_nascimento)}
              onChange={(e) =>
                setFormData({ ...formData, data_nascimento: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Telefone"
              fullWidth
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeletePacienteDialog = ({ open, onClose, onConfirm, paciente }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Deleção</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza de que deseja apagar o registro do paciente{' '}
          <strong>{paciente?.nome}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const AddPacienteDialog = ({
  open,
  onClose,
  onSave,
  newPacienteData,
  setNewPacienteData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Paciente</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          fullWidth
          value={newPacienteData.nome}
          onChange={(e) =>
            setNewPacienteData({ ...newPacienteData, nome: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={newPacienteData.email}
          onChange={(e) =>
            setNewPacienteData({ ...newPacienteData, email: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          fullWidth
          value={newPacienteData.senha}
          onChange={(e) =>
            setNewPacienteData({ ...newPacienteData, senha: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Data de Nascimento"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={newPacienteData.data_nascimento}
          onChange={(e) =>
            setNewPacienteData({
              ...newPacienteData,
              data_nascimento: e.target.value,
            })
          }
        />
        <TextField
          margin="dense"
          label="Telefone"
          fullWidth
          value={newPacienteData.telefone}
          onChange={(e) =>
            setNewPacienteData({ ...newPacienteData, telefone: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};