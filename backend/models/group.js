import { pool } from '../utils/db.js'

export const fetchGroups = async () => {
  const res = await pool.query('SELECT * FROM groups')
  return res.rows.map(group => transformGroup(group))
}

const transformGroup = (group) => {
  return {
    id: group.id,
    name: group.name
  }
}