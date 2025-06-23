const express = require('express');
const session = require('express-session');
require('dotenv').config();

const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');

const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const consultaRoutes = require('./routes/consultaRoutes');

const pool = require('./config/db');
const initializeDatabase = require('./config/db').initializeDatabase;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));

const app = express();

app.set('trust proxy', 1);

app.use(express.json());

// Sessão e Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,      // true se estiver com HTTPS
    sameSite: 'lax'     // 'lax' geralmente funciona bem; se necessário, 'none' requer 'secure'
  }
}));


app.use(passport.initialize());
app.use(passport.session());

// Middleware de proteção direto no index
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Não autenticado' });
}

// Rotas de autenticação
app.use(authRoutes);

// retira autenticação
app.get('/logout', ensureAuthenticated, (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(); // remove a sessão do servidor
    res.redirect('http://localhost:3001/');     // Redireciona para a página inicial ou de login
  });
});

app.get('/autenticado', ensureAuthenticated, (req, res) => {
  res.json({ msg: 'Você esta autenticado!', user: req.user });
});

// Rota da documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Suas rotas protegidas
app.use('/pacientes', ensureAuthenticated, pacienteRoutes);
app.use('/medicos', ensureAuthenticated, medicoRoutes);
app.use('/consultas', ensureAuthenticated, consultaRoutes);

async function startServer() {
  // Opcional: inicializa o banco (só se quiser testar a conexão no startup)
  try {
    await initializeDatabase();
  } catch (err) {
    console.error('Erro ao inicializar banco:', err);
    process.exit(1);
  }
}

startServer();

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
