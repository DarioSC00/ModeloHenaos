import * as Dashboard from '../models/dashboard_model.js'

export async function getDashboardSummary(req, res, next) {
  try { res.json({ ok: true, data: await Dashboard.getSummary() }) } catch (error) { next(error) }
}

export async function getWeeklySales(req, res, next) {
  try { res.json({ ok: true, data: await Dashboard.getWeeklySales() }) } catch (error) { next(error) }
}
