/* eslint-disable no-console  */

require('dotenv').config();
const express = require('express');

const app = express();
const config = require('./config');

const connectDB = require('./database/connection');

const loadMiddlewares = require('./app/middlewares');

const loadDynamicRoutes = require('./routes');

async function main() {
  try {
    await connectDB();

    loadMiddlewares(app);

    loadDynamicRoutes(app);

    await app.listen(config.server.port);
    console.clear();
    console.log(
      '\x1b[47m\x1b[46m%s\x1b[0m',
      `🧠 Server running on 👀`,
      '\x1b[1m\x1b[5m',
      `http://${config.server.host.replace('http://', '')}`,
    );
    console.log(
      '\x1b[46m\x1b[46m%s\x1b[2m',
      `🧠 Swagger documentation is here  👀`,
      '\x1b[1m\x1b[5m',
      `http://${config.server.host.replace('http://', '')}/docs`,
    );

    if (process.env.NODE_ENV == 'development') {
      console.log(`>> DB ADMIN  👀`, '\x1b[1m\x1b[5m', `http://localhost:${config.db.admin}`);
    }
  } catch (error) {
    console.log(error.message || 'Server Down');
  }
}

main();
