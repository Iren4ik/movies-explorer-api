const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key';
const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  DB_URL,
};
