const cors = require('cors');
const express = require('express');
const config = require('../config');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: config.cors.origin,
  credentials: true,
};

const middlewares = [
  cookieParser(),
  cors(corsOptions),

  express.json({ limit: '2048mb' }),
  express.urlencoded({
    limit: '2048mb',
    extended: false,
  }),

  // session({
  //   secret: config.auth.jwtSecret,
  //   resave: true,
  //   saveUninitialized: true,
  // }),
];

module.exports = app => {
  // app.set('trust proxy', true);
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
};
