const cors = require('cors');
const express = require('express');
const config = require('../../config');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const middlewares = [
  cors(),
  session({
    store: MongoStore.create({ mongoUrl: config.db.url }),
    secret: config.auth.jwtSecret,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  }),
  express.json({ limit: '2048mb' }),
  express.urlencoded({
    limit: '2048mb',
    extended: false,
  }),
];

module.exports = app => {
  middlewares.forEach(middleware => {
    app.use(middleware);
  });
};
