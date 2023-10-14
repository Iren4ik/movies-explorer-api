require('dotenv').config();

const {
  JWT_SECRET,
  DB_URL,
  NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
  DB_URL: NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb',
};
