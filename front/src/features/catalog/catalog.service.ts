import { del, get, post, put } from '../../services/api'
export type Product = { id: number; name: string; price: number; description: string; stock: number; categoryName: string; reference?: string; supplier?: string; total?: number; sale_date?: string; purchase_date?: string; status?: string }
export type Operation = { id: number; reference: string; name?: string; supplier?: string; description: string; categoryName?: string; price?: number; sale_date?: string; purchase_date?: string; total: number; status: string }
export const listProducts = () => get<{ products: Product[] }>('/products').then((r) => r.products)
export const createProduct = (data: unknown) => post<{ product: Product }>('/products', data).then((r) => r.product)
export const listPurchases = () => get<{ purchases: Operation[] }>('/purchases').then((r) => r.purchases)
export const createPurchase = (data: unknown) => post<{ purchase: Operation }>('/purchases', data).then((r) => r.purchase)
export const addPurchaseItem = (id: number, data: unknown) => post(`/purchases/${id}/items`, data)
export const listSales = () => get<{ sales: Operation[] }>('/sales').then((r) => r.sales)
export const createSale = (data: unknown) => post<{ sale: Operation }>('/sales', data).then((r) => r.sale)
export const addSaleItem = (id: number, data: unknown) => post(`/sales/${id}/items`, data)
export const deleteProduct = (id: number) => del(`/products/${id}`)
export const updateProduct = (id: number, data: unknown) => put(`/products/${id}`, data)
export const deletePurchase = (id: number) => del(`/purchases/${id}`)
export const updatePurchase = (id: number, data: unknown) => put(`/purchases/${id}`, data)
export const deleteSale = (id: number) => del(`/sales/${id}`)
export const updateSale = (id: number, data: unknown) => put(`/sales/${id}`, data)
export type Client = { id: number; full_name: string; document: string; client_type: string; cupo: number }
export type Supplier = { id: number; name: string; document?: string }
export const listClients = () => get<{ clients: Client[] }>('/catalog/clients').then((r) => r.clients)
export const listSuppliers = () => get<{ suppliers: Supplier[] }>('/catalog/suppliers').then((r) => r.suppliers)
