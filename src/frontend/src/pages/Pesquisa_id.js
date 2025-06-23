// src/components/Pesquisa_id.jsx
import React, { useState } from 'react';
import {
  CircularProgress,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from '../api/index';
import { useAuth } from '../contexts/AuthContext';

function formatarDataHora(dataISO) {
  // Remove o 'T' e tudo após o ponto (incluindo o .000Z)
  return dataISO.replace('T', ' ').replace(/\..+/, '');
}

function formatarData(dataISO) {
  // Remove tudo após o 'T' (incluindo o próprio 'T')
  return dataISO.split('T')[0];
}

const Pesquisa_id = () => {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState('pacientes');
  const [inputId, setInputId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    // Limpa resultados e mensagens anteriores
    setResult(null);
    setErrorMessage('');

    // Se nenhum ID for informado, retorna mensagem de erro
    if (!inputId) {
      setErrorMessage('Informe um ID válido.');
      return;
    }

    // Validações de autorização baseadas no usuário autenticado:
    // - Médicos podem buscar apenas seu próprio registro em "Médicos".
    // - Pacientes só podem buscar seu próprio registro em "Pacientes" e não podem acessar "Médicos".
    if (user.tipo === 'medico' && selectedType === 'medicos' && Number(inputId) !== user.id) {
      setErrorMessage('Sem autorização');
      return;
    }
    if (user.tipo === 'paciente') {
      if (selectedType === 'pacientes' && Number(inputId) !== user.id) {
        setErrorMessage('Sem autorização');
        return;
      }
      if (selectedType === 'medicos') {
        setErrorMessage('Sem autorização');
        return;
      }
    }

    try {
      setLoading(true);
      let endpoint = '';
      if (selectedType === 'pacientes') {
        endpoint = `/pacientes/${inputId}`;
      } else if (selectedType === 'medicos') {
        endpoint = `/medicos/${inputId}`;
      } else if (selectedType === 'consultas') {
        endpoint = `/consultas/${inputId}`;
      }
      const response = await api.get(endpoint);
      const data = response.data;
      // Se os dados forem retornados, apenas definimos o resultado.
      setResult(data);
    } catch (err) {
      // Mensagens de erro diferenciadas conforme o tipo de usuário
      if (user.tipo === 'admin') {
        setErrorMessage('Não encontrado');
      } else if (user.tipo === 'medico') {
        if (selectedType === 'medicos') {
          setErrorMessage('Sem autorização');
        } else {
          setErrorMessage('Sem resultados');
        }
      } else if (user.tipo === 'paciente') {
        setErrorMessage('Sem autorização');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para formatar valores conforme a chave
  const renderValue = (key, value) => {
    if (typeof value === 'string') {
      // Se for data de nascimento, aplica formatação apenas para data
      if (key === 'data_nascimento') {
        return formatarData(value);
      }
      // Se for uma data/hora (ISO) e conter "T", formata o valor
      if (value.includes('T')) {
        return formatarDataHora(value);
      }
    }
    return value;
  };

  // Função que renderiza um registro de forma legível (não exibe o array completo)
  const renderRecord = (record) => (
    <Box key={record.id || Math.random()} sx={{ mb: 2, p: 1, borderBottom: '1px solid #ccc' }}>
      {Object.entries(record).map(([key, value]) => (
        <Typography key={key}>
          <strong>{key}:</strong> {renderValue(key, value)}
        </Typography>
      ))}
    </Box>
  );

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="tipo-label">Tipo</InputLabel>
          <Select
            labelId="tipo-label"
            value={selectedType}
            label="Tipo"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="pacientes">Pacientes</MenuItem>
            <MenuItem value="medicos">Médicos</MenuItem>
            <MenuItem value="consultas">Consultas</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>
          Pesquisar
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
      {result && (
        <Box mt={2}>
          <Typography variant="h6">Resultado:</Typography>
          {Array.isArray(result)
            ? result.map((item) => renderRecord(item))
            : renderRecord(result)}
        </Box>
      )}
    </Paper>
  );
};

export default Pesquisa_id;
