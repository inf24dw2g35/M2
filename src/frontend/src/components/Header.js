// Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext'; // Importe o hook useAuth

const Header = () => {
  const { isLogged } = useAuth(); // Obtenha isLogged do contexto

  const handleAuthClick = () => {
    if (isLogged) {
      window.location.href = 'http://localhost:3000/logout';
    } else {
      window.location.href = 'http://localhost:3000/github';
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Plataforma de Consultas
        </Typography>
        <Button
          color="inherit"
          onClick={handleAuthClick} // Use a função handleAuthClick
          startIcon={isLogged ? <LogoutIcon /> : <GitHubIcon />}
        >
          {isLogged ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;