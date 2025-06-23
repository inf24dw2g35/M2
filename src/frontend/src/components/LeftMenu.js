// LeftMenu.js
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', route: '/' },
    { text: 'Pacientes', route: '/pacientes' },
    { text: 'Médicos', route: '/medicos' },
    { text: 'Consultas', route: '/consultas' },
    { text: 'Pesquisa por ID', route: '/pesquisa_id' },
  ];

  const isActive = (route) => location.pathname === route;

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        height: '100%',
        borderRight: '1px solid #ddd'
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.route)}
              sx={{
                bgcolor: isActive(item.route) ? 'primary.main' : 'inherit',
                color: isActive(item.route) ? 'white' : 'inherit',
                '&:hover': {
                  bgcolor: isActive(item.route) ? 'primary.dark' : 'action.hover'
                }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftMenu;
