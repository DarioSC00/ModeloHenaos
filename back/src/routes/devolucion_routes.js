import { Router } from 'express'
import { addDevolutionDetail, createDevolution, getDevolutionDetails, getDevolutions } from '../controllers/devolucion_controller.js'
const router = Router()
router.get('/', getDevolutions); router.post('/', createDevolution)
router.get('/:id/details', getDevolutionDetails); router.post('/:id/details', addDevolutionDetail)
export default router
