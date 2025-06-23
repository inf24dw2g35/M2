// src/models/ConsultasDialogs.js
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

export const EditConsultaDialog = ({
  open,
  onClose,
  onSave,
  consulta,
  formData,
  setFormData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Consultas</DialogTitle>
      <DialogContent>
        {consulta && (
          <>
            <TextField
              margin="dense"
              label="Paciente ID"
              fullWidth
              value={formData.paciente_id}
              onChange={(e) =>
                setFormData({ ...formData, paciente_id: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Medico ID"
              fullWidth
              value={formData.medico_id}
              onChange={(e) =>
                setFormData({ ...formData, medico_id: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Data e Hora"
              fullWidth
              value={formData.data_hora}
              onChange={(e) =>
                setFormData({ ...formData, data_hora: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Estado"
              fullWidth
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
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

export const DeleteConsultaDialog = ({ open, onClose, onConfirm, consulta }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Deleção</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza de que deseja apagar o registro da Consulta{' '}
          <strong>{consulta?.nome}</strong>?
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

export const AddConsultaDialog = ({
  open,
  onClose,
  onSave,
  newConsultaData,
  setNewConsultaData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Consulta</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Paciente ID"
          fullWidth
          value={newConsultaData.paciente_id}
          onChange={(e) =>
            setNewConsultaData({ ...newConsultaData, paciente_id: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Medico ID"
          fullWidth
          value={newConsultaData.medico_id}
          onChange={(e) =>
            setNewConsultaData({ ...newConsultaData, medico_id: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Data e Hora"
          fullWidth
          value={newConsultaData.data_hora}
          onChange={(e) =>
            setNewConsultaData({ ...newConsultaData, data_hora: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Estado"
          fullWidth
          value={newConsultaData.status}
          onChange={(e) =>
            setNewConsultaData({ ...newConsultaData, status: e.target.value })
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