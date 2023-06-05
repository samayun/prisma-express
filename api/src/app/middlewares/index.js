const cors = require('cors');
const express = require('express');
const config = require('../../config');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const middlewares = [
  cors(),
  cookieParser(),

  express.json({ limit: '2048mb' }),
  express.urlencoded({
    limit: '2048mb',
    extended: false,
  }),

  session({
    secret: config.auth.jwtSecret,
    resave: true,
    saveUninitialized: true,
  }),
];

module.exports = app => {
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
};
