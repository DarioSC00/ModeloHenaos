import { Router } from 'express'
import { getDashboardDetails, saveDashboardDetail } from '../controllers/dashboard_detalle_controller.js'

const router = Router()
router.get('/', getDashboardDetails)
router.post('/', saveDashboardDetail)
export default router
