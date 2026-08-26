import { pool } from '../config/database.js'

export async function getSummary() {
  const [[products]] = await pool.execute('SELECT COUNT(*) AS total FROM products')
  const [[categories]] = await pool.execute('SELECT COUNT(*) AS total FROM categories')
  const [[sales]] = await pool.execute("SELECT COALESCE(SUM(total), 0) AS total FROM sales WHERE status = 'completed'")
  const [[purchases]] = await pool.execute("SELECT COALESCE(SUM(total), 0) AS total FROM purchases WHERE status = 'completed'")
  const [[lowStock]] = await pool.execute('SELECT COUNT(*) AS total FROM products WHERE stock = 0')
  return { products: Number(products.total), categories: Number(categories.total), sales: Number(sales.total), purchases: Number(purchases.total), lowStock: Number(lowStock.total) }
}

export async function getWeeklySales() {
  const [rows] = await pool.execute(`SELECT DATE_FORMAT(sale_date, '%a') AS name, COALESCE(SUM(total), 0) AS value
    FROM sales WHERE status = 'completed' AND sale_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY sale_date ORDER BY sale_date`)
  return rows
}
