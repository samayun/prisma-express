const mongoose = require('mongoose');

const config = require('../config');

module.exports = async function connectDB() {
  try {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`🧠 Connecting to ${config.db.url}`);
    }
    await mongoose.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
    return Promise.resolve(`Database Connected`);
  } catch (error) {
    return Promise.reject(error.message);
  }
};
