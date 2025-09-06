require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'vambe_db',
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: `${process.env.POSTGRES_DB || 'vambe_db'}_test`,
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'vambe_db',
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres'
  }
};
