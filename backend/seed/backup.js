import fs from 'fs';
import { pool } from '../utils/db.js';

const BACKUP_FILE = './users_backup.json';

const backup = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows;

    fs.writeFileSync(BACKUP_FILE, JSON.stringify(users, null, 2));
    console.log(`Backup created successfully: ${BACKUP_FILE}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating backup:', error);
    process.exit(1);
  }
};

backup();
// node seed/backup.js