import fs from 'fs';
import path from 'path';
import { pool } from '../utils/db.js';

const BACKUP_FILE = path.join('./seed', 'data_backup.json');

const restore = async () => {
  try {
    const rawData = fs.readFileSync(BACKUP_FILE, 'utf-8');
    const { groups, users } = JSON.parse(rawData);
    for (const group of groups) {
      await pool.query(
        `INSERT INTO groups (id, name)
         VALUES ($1, $2)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name`,
        [group.id, group.name]
      );
    }
    for (const user of users) {
      await pool.query(
        `INSERT INTO users (id, name, email, phone, group_id)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           email = EXCLUDED.email,
           phone = EXCLUDED.phone,
           group_id = EXCLUDED.group_id`,
        [user.id, user.name, user.email, user.phone, user.group_id]
      );
    }
    console.log(`Restore completed successfully from ${BACKUP_FILE}`);
    process.exit(0);
  } catch (error) {
    console.error('Error restoring backup:', error);
    process.exit(1);
  }
};

restore();

// node seed/restore.js