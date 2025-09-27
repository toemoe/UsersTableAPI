import pkg from 'pg';
import config from './config.js';

const { Pool } = pkg;

export const pool = new Pool({
  user: config.USER,
  host: config.HOST,
  database: config.DATABASE,
  password: config.PASSWORD,
  port: config.PORT_DB,
})