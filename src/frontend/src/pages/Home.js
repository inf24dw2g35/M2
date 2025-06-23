// src/pages/Home.js
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { user, isLogged, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Dialog open={!isLogged} disableEscapeKeyDown>
        <DialogTitle>Autenticação Necessária</DialogTitle>
        <DialogContent>
          <Typography>
            Por favor, faça login para continuar utilizando a plataforma.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={() => {
              window.location.href = 'http://localhost:3000/github';
            }}
          >
            Login com GitHub
          </Button>
        </DialogActions>
      </Dialog>

      <Card sx={{
        marginTop: '5rem',
        maxWidth: 600,
        margin: '2rem auto',
        padding: '1rem',
      }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Bem-vindo ao Sistema Médico
          </Typography>

          {isLogged && (
            <>
              {user ? (
                <div>
                  <Typography variant="body1">
                    <strong>id:</strong> {user.id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>tipo:</strong> {user.tipo}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </div>
              ) : (
                <Typography variant="body1">
                  Nenhuma informação disponível.
                </Typography>
              )}
              
              <Button
                onClick={() => navigate('/pacientes')}
                variant="contained"
                sx={{ marginTop: 2 }}
              >
                Gerenciar Pacientes
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Home;