import fs from 'fs';
import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

async function insertData() {
  try {
    for (const group of data.groups) {
      await pool.query(
        'INSERT INTO groups(id, name) VALUES($1, $2) ON CONFLICT (id) DO NOTHING',
        [group.id, group.name]
      );
    }
    for (const user of data.users) {
      await pool.query(
        'INSERT INTO users(id, name, email, phone, group_id) VALUES($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
        [user.id, user.name, user.email, user.phone, user.group_id]
      );
    }

    console.log('Данные успешно вставлены!');
  } catch (err) {
    console.error('Ошибка при вставке:', err);
  } finally {
    await pool.end();
  }
}

insertData();
