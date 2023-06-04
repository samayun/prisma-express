require('dotenv').config();

const config = {
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 5000,
  },
  api: {
    version: process.env.apiVersion || 'v1',
    apiRoutePrefix: process.env.apiRoutePrefix || '/api',
    swaggerRoutePrefix: process.env.swaggerRoutePrefix || '/docs',
  },
  db: {
    url: process.env.DATABASE_URL || 'mongodb://admin:password@db:27017/admin?authSource=prisma',
    admin: process.env.DB_ADMIN_PORT || 8081,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY',
  },
};

module.exports = config;
