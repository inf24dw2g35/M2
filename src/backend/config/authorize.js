function permitirTipos(...tiposPermitidos) {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ erro: 'Não autenticado' });
    }

    const tipoUsuario = req.user?.tipo;

    if (!tiposPermitidos.includes(tipoUsuario)) {
      return res.status(403).json({ erro: 'Acesso negado para seu perfil de usuário' });
    }

    next();
  };
}

module.exports = { permitirTipos };
