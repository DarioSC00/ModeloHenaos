import { pool } from '../config/database.js'

export async function findAll() {
  const [rows] = await pool.execute('SELECT id, name, description, status, created_at AS createdAt FROM categories ORDER BY name')
  return rows
}

export async function findById(id) {
  const [rows] = await pool.execute('SELECT id, name, description, status, created_at AS createdAt FROM categories WHERE id = ?', [id])
  return rows[0] || null
}

export async function create({ name, description }) {
  const [result] = await pool.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description])
  return findById(result.insertId)
}

export async function update(id, { name, description }) {
  const [result] = await pool.execute('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id])
  return result.affectedRows ? findById(id) : null
}

export async function remove(id) {
  const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [id])
  return result.affectedRows > 0
}

export async function changeStatus(id, status) {
  const [result] = await pool.execute('UPDATE categories SET status = ? WHERE id = ?', [status, id])
  return result.affectedRows ? findById(id) : null
}
