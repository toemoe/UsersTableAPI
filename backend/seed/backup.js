import fs from 'fs';
import { pool } from '../utils/db.js';

const BACKUP_FILE = './seed/data_backup.json';

const backup = async () => {
  try {
    const groupsResult = await pool.query('SELECT * FROM groups');
    const groups = groupsResult.rows;
    const usersResult = await pool.query('SELECT * FROM users');
    const users = usersResult.rows;
    const backupData = { groups, users };
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(backupData, null, 2));
    console.log(`Backup created successfully: ${BACKUP_FILE}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating backup:', error);
    process.exit(1);
  }
};

backup();
// node seed/backup.js