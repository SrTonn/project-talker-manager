const loginData = require('../data/loginData');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({ message: 'Token não encontrado' });

  const tokenIsValidity = loginData.some(({ token }) => token === authorization);
  if (!tokenIsValidity) {
    res.status(401).json({ message: 'Token inválido' });
  }
  next();
};
