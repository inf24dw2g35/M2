// src/models/MedicoDialogs.js
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

export const EditMedicoDialog = ({
  open,
  onClose,
  onSave,
  medico,
  formData,
  setFormData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Médico</DialogTitle>
      <DialogContent>
        {medico && (
          <>
            <TextField
              margin="dense"
              label="ID"
              fullWidth
              value={medico.id}
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
              label="Especialidade"
              fullWidth
              value={formData.especialidade}
              onChange={(e) =>
                setFormData({ ...formData, especialidade: e.target.value })
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

export const DeleteMedicoDialog = ({ open, onClose, onConfirm, medico }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Deleção</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza de que deseja apagar o registro do médico{' '}
          <strong>{medico?.nome}</strong>?
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

export const AddMedicoDialog = ({
  open,
  onClose,
  onSave,
  newMedicoData,
  setNewMedicoData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Médico</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          fullWidth
          value={newMedicoData.nome}
          onChange={(e) =>
            setNewMedicoData({ ...newMedicoData, nome: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={newMedicoData.email}
          onChange={(e) =>
            setNewMedicoData({ ...newMedicoData, email: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          fullWidth
          value={newMedicoData.senha}
          onChange={(e) =>
            setNewMedicoData({ ...newMedicoData, senha: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Especialidade"
          fullWidth
          value={newMedicoData.especialidade}
          onChange={(e) =>
            setNewMedicoData({
              ...newMedicoData,
              especialidade: e.target.value,
            })
          }
        />
        <TextField
          margin="dense"
          label="Telefone"
          fullWidth
          value={newMedicoData.telefone}
          onChange={(e) =>
            setNewMedicoData({ ...newMedicoData, telefone: e.target.value })
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
