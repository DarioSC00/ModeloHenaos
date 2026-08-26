import { pool } from '../config/database.js'
export async function findAll() { const [rows] = await pool.execute("SELECT id, name, document, phone, email, address, city, status FROM suppliers WHERE status = 'ACTIVO' ORDER BY name"); return rows }
export async function findById(id) { const [rows] = await pool.execute('SELECT * FROM suppliers WHERE id = ?', [id]); return rows[0] || null }
export async function create(data) { const [result] = await pool.execute('INSERT INTO suppliers (name, document, phone, email, address, city) VALUES (?, ?, ?, ?, ?, ?)', [data.name, data.document || null, data.phone || null, data.email || null, data.address || null, data.city || null]); return findById(result.insertId) }
