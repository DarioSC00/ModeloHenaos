import { Router } from 'express'
import { getCategories, createCategory, updateCategory, deleteCategory, changeStatusCategory } from '../controllers/categoria_controller.js'

const router = Router()
router.get('/', getCategories)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
router.patch('/:id/status', changeStatusCategory)

export default router
