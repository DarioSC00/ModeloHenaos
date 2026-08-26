import * as DashboardDetail from '../models/dashboard_detalle_model.js'

export async function getDashboardDetails(req, res, next) {
  try { const { period_start, period_end } = req.query; if (!period_start || !period_end) return res.status(400).json({ ok: false, msg: 'period_start y period_end son obligatorios' }); res.json({ ok: true, details: await DashboardDetail.findByPeriod(period_start, period_end) }) } catch (error) { next(error) }
}

export async function saveDashboardDetail(req, res, next) {
  try { const detail = await DashboardDetail.save(req.body); res.status(201).json({ ok: true, detail }) } catch (error) { next(error) }
}
