const express = require('express');
const { authToken, validationTalker } = require('../middlewares');

const routes = express.Router();
const { readData, writeData } = require('../utils');

routes.get('/search', authToken, (req, res) => {
  const { q } = req.query;
  console.log(q);
  const filtered = readData().filter(({ name }) => name.includes(q));
  res.status(200).json(filtered);
});

routes.get('/', (_req, res) => {
  res.status(200).json(readData());
});

routes.get('/:id', (req, res) => {
  const { id } = req.params;

  const filteredId = readData().filter((data) => data.id === +id)[0];
  if (!filteredId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(filteredId);
});

routes.post('/', authToken, validationTalker, (req, res) => {
  const { body: newTalker } = req;
  const data = readData();

  newTalker.id = (data.length && Math.max(...data.map(({ id }) => id))) + 1;
  data.push(newTalker);

  writeData('./talker.json', data);

  res.status(201).json(newTalker);
});

routes.put('/:id', authToken, validationTalker, (req, res) => {
  const { body: newTalker } = req;
  const { id } = req.params;
  const data = readData();
  const newData = data.filter((talker) => talker.id !== +id);

  newTalker.id = +id;
  newData.push(newTalker);
  newData.sort((a, b) => a.id - b.id);

  writeData('./talker.json', newData);

  res.status(200).json(newTalker);
});

routes.delete('/:id', authToken, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = await readData();
  const newData = data.filter((talker) =>
    talker.id !== +id || talker.name === name);

  await writeData('./talker.json', newData);

  res.status(204).end();
});

module.exports = routes;