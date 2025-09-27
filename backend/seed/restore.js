import fs from 'fs';
import { pool } from '../utils/db.js';

const BACKUP_FILE = './users_backup.json';

const restore = async () => {
  try {
    const data = fs.readFileSync(BACKUP_FILE, 'utf-8');
    const users = JSON.parse(data);

    for (const user of users) {
      // Используем UPSERT по email, чтобы не дублировать
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