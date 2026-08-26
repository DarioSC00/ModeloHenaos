import * as ProductService from '../services/producto_service.js'

export async function getProducts(req, res, next) {
  try {
    const products = await ProductService.getAllProducts()
    res.status(200).json({ ok: true, count: products.length, products })
  } catch (error) {
    next(error)
  }
}

export async function getProductById(req, res, next) {
  try {
    const product = await ProductService.getProductById(req.params.id)
    res.status(200).json({ ok: true, product })
  } catch (error) {
    next(error)
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await ProductService.createProduct(req.body)
    res.status(201).json({ ok: true, msg: 'Producto creado con éxito', product })
  } catch (error) {
    next(error)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body)
    res.status(200).json({ ok: true, msg: 'Producto actualizado con éxito', product })
  } catch (error) {
    next(error)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await ProductService.deleteProduct(req.params.id)
    res.status(200).json({ ok: true, msg: 'Producto eliminado correctamente', product })
  } catch (error) {
    next(error)
  }
}