import { Router } from 'express'
import { getSales, getSaleById, createSale, updateSale, deleteSale, addSaleItem, getSaleItems } from '../controllers/venta_controller.js'

const router = Router()
router.get('/', getSales)
router.get('/:id', getSaleById)
router.post('/', createSale)
router.put('/:id', updateSale)
router.delete('/:id', deleteSale)
router.post('/:id/items', addSaleItem)
router.get('/:id/items', getSaleItems)

export default router
