const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('./db'); // ajuste o caminho se necessário
require('dotenv').config();

// Serializa apenas ID e tipo
passport.serializeUser((user, done) => {
  done(null, { id: user.id, tipo: user.tipo });
});

// Desserializa buscando no banco com base no tipo
passport.deserializeUser(async (userObj, done) => {
  try {
    const { id, tipo } = userObj;

    if (tipo === 'paciente') {
      const [rows] = await db.query('SELECT * FROM Pacientes WHERE id = ?', [id]);
      if (rows.length > 0) {
        return done(null, { ...rows[0], tipo: 'paciente' });
      }
    } else if (tipo === 'medico') {
      const [rows] = await db.query('SELECT * FROM Medicos WHERE id = ?', [id]);
      if (rows.length > 0) {
        return done(null, { ...rows[0], tipo: 'medico' });
      }
    } else if (tipo === 'adm') {
      // Exemplo: admin identificado pelo email
      return done(null, { id, tipo: 'adm', email: 'admin@email.com' });
    }

    done(null, false); // Usuário não encontrado
  } catch (err) {
    done(err);
  }
});

// GitHub login versão de produção
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    // Verifica se é paciente
    const [pacientes] = await db.query('SELECT * FROM Pacientes WHERE email = ?', [email]);
    if (pacientes.length > 0) {
      return done(null, { id: pacientes[0].id, tipo: 'paciente' });
    }

    // Verifica se é médico
    const [medicos] = await db.query('SELECT * FROM Medicos WHERE email = ?', [email]);
    if (medicos.length > 0) {
      return done(null, { id: medicos[0].id, tipo: 'medico' });
    }

    // Verifica se é admin (email fixo)
    if (email === 'admboladao99@gmail.com') {
      return done(null, { id: 999, tipo: 'adm' });
    }

    // Caso não encontrado
    return done(null, false);
  } catch (error) {
    done(error);
  }
}));

module.exports = passport;

