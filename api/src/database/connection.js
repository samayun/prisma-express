const config = require('../config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connectDB() {
  try {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`🧠 Connecting to ${config.db.url}`);
    }

    return Promise.resolve(`Database Connected`);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

module.exports = { connectDB, prisma };
