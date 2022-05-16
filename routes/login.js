const express = require('express');

const routes = express.Router();
const { generateToken } = require('../utils');
const data = require('../data/loginData');
const { validation } = require('../middlewares');

routes.post('/', validation, (req, res, next) => {
  const { body } = req;
  data.push(body);
  res.status(200).json({ token: generateToken() });
  next();
});

module.exports = routes;