const express = require('express');

const routes = express.Router();
const { generateToken } = require('../utils');
const data = require('../data/loginData');
const { validationLogin } = require('../middlewares');

routes.post('/', validationLogin, (req, res, next) => {
  const { body } = req;
  const token = generateToken();
  body.token = token;
  data.push(body);
  res.status(200).json({ token });
  next();
});

module.exports = routes;