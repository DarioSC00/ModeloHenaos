import { Router } from 'express'
import { getPurchases, getPurchaseById, createPurchase, updatePurchase, deletePurchase, addPurchaseItem, getPurchaseItems } from '../controllers/compra_controller.js'

const router = Router()
router.get('/', getPurchases)
router.get('/:id', getPurchaseById)
router.post('/', createPurchase)
router.put('/:id', updatePurchase)
router.delete('/:id', deletePurchase)
router.post('/:id/items', addPurchaseItem)
router.get('/:id/items', getPurchaseItems)

export default router
