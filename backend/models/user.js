import { pool } from '../utils/db.js'

export const fetchUsers = async () => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows.map(user => transformUser(user))
}

export const fetchUserById = async (id) => {
  const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
  if (res.rows.length === 0) return null
  return transformUser(res.rows[0])
}

export const queryInsertUser = async (user) => {
  const res = await pool.query(
    `INSERT INTO users (name, email, phone, group_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [ user.name, user.email, user.phone, user.group_id ]
  )
  return transformUser(res.rows[0])
}

export const queryUpdateUser = async (id, user) => {
  const res = await pool.query(
    `UPDATE users SET name = $1, email = $2, phone = $3, group_id = $4 WHERE id = $5 RETURNING *`,
    [ user.name, user.email, user.phone, user.group_id, id ]
  )
  return transformUser(res.rows[0])
}

export const queryDeleteUser = async (id) => {
  const res = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [ id ]
  )
  return transformUser(res.rows[0])
}

const transformUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    group_id: user.group_id
  }
}