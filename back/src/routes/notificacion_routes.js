import { Router } from 'express'
import { getNotifications, createNotification, markNotificationRead, getNotificationDetails, addNotificationDetail } from '../controllers/notificacion_controller.js'

const router = Router()
router.get('/', getNotifications)
router.post('/', createNotification)
router.patch('/:id/read', markNotificationRead)
router.get('/:id/details', getNotificationDetails)
router.post('/:id/details', addNotificationDetail)
export default router
