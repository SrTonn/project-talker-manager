const express = require('express');

const routes = express.Router();
// const middlewares = require('../middlewares');
const { readData } = require('../utils');

routes.get('/', (_req, res, next) => {
  res.status(200).json(readData());
  next();
});

routes.get('/:id', (req, res, next) => {
  const { id } = req.params;

  const filteredId = readData().filter((data) => data.id === +id).at(0);
  if (!filteredId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(filteredId);
  next();
});

module.exports = routes;