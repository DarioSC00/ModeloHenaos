import { del, get, post, put } from '../../services/api'
export type Category = { id: number; name: string; description: string; status: boolean; reference?: string; supplier?: string; categoryName?: string; price?: number; total?: number; sale_date?: string; purchase_date?: string }
export const listCategories = () => get<{ categories: Category[] }>('/categories').then((r) => r.categories)
export const createCategory = (data: Omit<Category, 'id' | 'status'>) => post<Category>('/categories', data)
export const deleteCategory = (id: number) => del(`/categories/${id}`)
export const updateCategory = (id: number, data: unknown) => put(`/categories/${id}`, data)
