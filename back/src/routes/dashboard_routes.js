import { Router } from 'express'
import { getDashboardSummary, getWeeklySales } from '../controllers/dashboard_controller.js'

const router = Router()
router.get('/summary', getDashboardSummary)
router.get('/weekly-sales', getWeeklySales)

export default router
