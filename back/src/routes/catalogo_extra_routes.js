import { Router } from 'express'
import { createClient, createSupplier, getClients, getSuppliers } from '../controllers/catalogo_extra_controller.js'
const router = Router()
router.get('/clients', getClients); router.post('/clients', createClient)
router.get('/suppliers', getSuppliers); router.post('/suppliers', createSupplier)
export default router
