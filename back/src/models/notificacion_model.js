import { pool } from '../config/database.js'

export async function findAll() {
  const [rows] = await pool.execute('SELECT * FROM notifications ORDER BY created_at DESC')
  return rows
}
export async function findById(id) {
  const [rows] = await pool.execute('SELECT * FROM notifications WHERE id = ?', [id])
  return rows[0] || null
}
export async function create({ title, message, type = 'info' }) {
  const [result] = await pool.execute('INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)', [title, message, type])
  return findById(result.insertId)
}
export async function markRead(id) {
  const [result] = await pool.execute('UPDATE notifications SET is_read = TRUE, read_at = CURRENT_TIMESTAMP WHERE id = ?', [id])
  return result.affectedRows ? findById(id) : null
}
export async function addDetail(notificationId, { entity_type, entity_id = null, detail_key, detail_value = null }) {
  const [result] = await pool.execute('INSERT INTO notification_details (notification_id, entity_type, entity_id, detail_key, detail_value) VALUES (?, ?, ?, ?, ?)', [notificationId, entity_type, entity_id, detail_key, detail_value])
  return result.insertId
}
export async function findDetails(notificationId) {
  const [rows] = await pool.execute('SELECT * FROM notification_details WHERE notification_id = ? ORDER BY created_at', [notificationId])
  return rows
}
