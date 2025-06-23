// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import Home from './pages/Home';
import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import Consultas from './pages/Consultas';
import Pesquisa_id from './pages/Pesquisa_id';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div style={{
          display: 'flex',
          width: '100%',
          height: 'calc(100vh - 64px)'
        }}>
          <LeftMenu />
          <div style={{ flex: 1, padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/medicos" element={<Medicos />} />
              <Route path="/consultas" element={<Consultas />} />
              <Route path="/pesquisa_id" element={<Pesquisa_id />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;