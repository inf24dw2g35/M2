const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// Início da autenticação com GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback após autenticação
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/falha' }),
  (req, res) => {
    res.redirect('http://localhost:3001/');
  }
);

router.get('/falha', (req, res) => {
  res.status(401).send('Falha na autenticação com GitHub.');
});

module.exports = router;
