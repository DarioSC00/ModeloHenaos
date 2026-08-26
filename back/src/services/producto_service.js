import * as Product from '../models/producto_model.js'

export async function getAllProducts() {
  const products = await Product.findAll()
  return products
}

export async function getProductById(id) {
  const product = await Product.findById(id)
  if (!product) throw { status: 404, msg: 'Producto no encontrado' }
  return product
}

export async function createProduct(data) {
  const { code, name, price, category, brand } = data
  if (!code || !name || price === undefined || !category || !brand) {
    throw { status: 400, msg: 'code, name, price, category y brand son obligatorios' }
  }
  const product = await Product.create(data)
  return product
}

export async function updateProduct(id, data) {
  const { code, name, price, category, brand } = data
  if (!code || !name || price === undefined || !category || !brand) {
    throw { status: 400, msg: 'code, name, price, category y brand son obligatorios' }
  }
  const product = await Product.update(id, data)
  if (!product) throw { status: 404, msg: 'Producto no encontrado para actualizar' }
  return product
}

export async function deleteProduct(id) {
  const product = await Product.findById(id)
  if (!product) throw { status: 404, msg: 'Producto no encontrado para eliminar' }
  const removed = await Product.remove(id)
  if (!removed) throw { status: 404, msg: 'Producto no encontrado para eliminar' }
  return product
}
