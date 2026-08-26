import { pool } from '../config/database.js'

export async function findByEmail(email) {
  const [rows] = await pool.execute('SELECT id, name, email, password_hash, role, status FROM users WHERE email = ?', [email])
  return rows[0] || null
}

export async function findPublicById(id) {
  const [rows] = await pool.execute('SELECT id, name, email, role, status FROM users WHERE id = ?', [id])
  return rows[0] || null
}

export async function create({ name, email, passwordHash, role = 'admin' }) {
  const [result] = await pool.execute('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [name, email, passwordHash, role])
  return findPublicById(result.insertId)
}
