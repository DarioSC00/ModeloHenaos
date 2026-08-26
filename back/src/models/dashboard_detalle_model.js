import { pool } from '../config/database.js'

export async function findByPeriod(periodStart, periodEnd) {
  const [rows] = await pool.execute('SELECT * FROM dashboard_details WHERE period_start = ? AND period_end = ? ORDER BY id', [periodStart, periodEnd])
  return rows
}

export async function save({ metric_key, metric_label, metric_value = 0, metric_type = 'number', period_start, period_end }) {
  await pool.execute(`INSERT INTO dashboard_details (metric_key, metric_label, metric_value, metric_type, period_start, period_end)
    VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE metric_label = VALUES(metric_label), metric_value = VALUES(metric_value), metric_type = VALUES(metric_type)`, [metric_key, metric_label, metric_value, metric_type, period_start, period_end])
  const [rows] = await pool.execute('SELECT * FROM dashboard_details WHERE metric_key = ? AND period_start = ? AND period_end = ?', [metric_key, period_start, period_end])
  return rows[0]
}
