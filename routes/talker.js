const express = require('express');
const { authToken, validationTalker } = require('../middlewares');

const routes = express.Router();
const { readData, writeData } = require('../utils');

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

routes.post('/', authToken, validationTalker, (req, res, next) => {
  const { body: newTalker } = req;
  const data = readData();

  newTalker.id = data.length + 1;
  data.push(newTalker);

  writeData('./talker.json', data);

  res.status(201).json(newTalker);
  next();
});

routes.put('/:id', authToken, validationTalker, (req, res, next) => {
  const { body: newTalker } = req;
  const { id } = req.params;
  const data = readData();
  const newData = data.filter((talker) => talker.id !== +id);

  newTalker.id = +id;
  newData.push(newTalker);
  newData.sort((a, b) => a.id - b.id);

  writeData('./talker.json', newData);

  res.status(200).json(newTalker);
  next();
});

module.exports = routes;