/* eslint-disable no-console  */
require('dotenv').config();
const express = require('express');

const app = express();
const config = require('./config');

const { prisma, connectDB } = require('./database/connection');

const loadMiddlewares = require('./loaders/global.middlewares');

const loadDynamicRoutes = require('./routes');

async function main() {
  try {
    await connectDB();

    loadMiddlewares(app);

    loadDynamicRoutes(app);

    await app.listen(config.server.port);

    console.log(
      '\x1b[42m\x1b[40m%s\x1b[0m',
      `🧠 Server running on 👀`,
      // '\x1b[1m\x1b[5m',
      `http://${config.server.host.replace('http://', '')}`,
    );
    console.log(
      '\x1b[42m\x1b[38m%s\x1b[0m',
      `🟢 Swagger documentation is here  👀`,
      `http://${config.server.host.replace('http://', '')}/docs`,
    );

    if (process.env.NODE_ENV == 'development') {
      console.log(
        '\x1b[42m\x1b[43m%s\x1b[0m',
        `⭐️ DB ADMIN  👀`,
        `http://localhost:${config.db.admin}`,
      );
    }
  } catch (error) {
    console.log(error.message || 'Server Down');
  } finally {
    return null;
  }
}

main()
  .then(async () => {
    console.log('DB CONNECTED');
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
