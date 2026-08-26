import * as Category from '../models/categoria_model.js'

export async function getCategories(req, res, next) {
  try { const categories = await Category.findAll(); res.status(200).json({ ok: true, count: categories.length, categories }) } catch (error) { next(error) }
}

export async function createCategory(req, res, next) {
  try {
    const { name, description } = req.body
    if (!name || !description) return res.status(400).json({ ok: false, msg: 'El nombre y la descripción son obligatorios' })
    const category = await Category.create({ name, description })
    res.status(201).json({ ok: true, category })
  } catch (error) { next(error) }
}

export async function updateCategory(req, res, next) {
  try {
    const { name, description } = req.body
    if (!name || !description) return res.status(400).json({ ok: false, msg: 'El nombre y la descripción son obligatorios' })
    const category = await Category.update(req.params.id, { name, description })
    if (!category) return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' })
    res.status(200).json({ ok: true, category })
  } catch (error) { next(error) }
}

export async function deleteCategory(req, res, next) {
  try {
    if (!await Category.remove(req.params.id)) return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' })
    res.status(200).json({ ok: true, msg: 'Categoría eliminada permanentemente' })
  } catch (error) { next(error) }
}

export async function changeStatusCategory(req, res, next) {
  try {
    const current = await Category.findById(req.params.id)
    if (!current) return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' })
    const category = await Category.changeStatus(req.params.id, !current.status)
    res.status(200).json({ ok: true, category })
  } catch (error) { next(error) }
}
