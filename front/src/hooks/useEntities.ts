import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../features/categories/categories.service'
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  listPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  addPurchaseItem,
  listSales,
  createSale,
  updateSale,
  deleteSale,
  addSaleItem,
} from '../features/catalog/catalog.service'

export type Kind = 'categories' | 'products' | 'purchases' | 'sales'

export function useEntities(kind: Kind, refresh: number) {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const load =
      kind === 'categories'
        ? listCategories
        : kind === 'products'
        ? listProducts
        : kind === 'purchases'
        ? listPurchases
        : listSales

    load()
      .then(setRows)
      .catch(() => toast.error('No se pudieron cargar los datos'))
      .finally(() => setLoading(false))
  }, [kind, refresh])

  const saveEntity = async (isEditing: boolean, id: number | null, data: any) => {
    if (isEditing && id !== null) {
      if (kind === 'categories') await updateCategory(id, data)
      if (kind === 'products') await updateProduct(id, data)
      if (kind === 'purchases') await updatePurchase(id, data)
      if (kind === 'sales') await updateSale(id, data)
      toast.success('Registro actualizado')
    } else {
      if (kind === 'categories') await createCategory(data)
      if (kind === 'products') await createProduct(data)
      if (kind === 'purchases') {
        const purchase = await createPurchase(data)
        if (data.product_id) await addPurchaseItem(purchase.id, data)
      }
      if (kind === 'sales') {
        const sale = await createSale(data)
        if (data.product_id) await addSaleItem(sale.id, data)
      }
      toast.success('Registro guardado correctamente')
    }
  }

  const removeEntity = async (id: number) => {
    if (!window.confirm('¿Eliminar este registro?')) return false
    try {
      if (kind === 'categories') await deleteCategory(id)
      if (kind === 'products') await deleteProduct(id)
      if (kind === 'purchases') await deletePurchase(id)
      if (kind === 'sales') await deleteSale(id)
      toast.success('Registro eliminado')
      return true
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo eliminar')
      return false
    }
  }

  return { rows, loading, saveEntity, removeEntity }
}
