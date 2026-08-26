import { get } from '../../services/api'
export type Summary = { products: number; categories: number; sales: number; purchases: number; lowStock: number }
export const getSummary = () => get<Summary>('/dashboard/summary')
