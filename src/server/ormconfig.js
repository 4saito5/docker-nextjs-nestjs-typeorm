// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, './config/local.env') });

module.exports = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['./database/entities/**/*.ts'],
  migrations: ['./database/migrations/**/*.ts'],
  subscribers: ['./database/subscribers/**/*.ts'],
  seeds: ['./database/seeds/**/*.ts'],
  factories: ['./database/factories/**/*.ts'],
  cli: {
    entitiesDir: './database/entities',
    migrationsDir: './database/migrations',
    subscribersDir: './database/subscribers',
    seedsDir: './database/seeds',
    factoriessDir: './database/factories',
  },
}
