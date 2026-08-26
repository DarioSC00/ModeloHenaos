const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
export async function request<T>(path: string, options?: RequestInit): Promise<T> { const token = localStorage.getItem('henaos_token'); const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...options }); const body = await response.json(); if (response.status === 401) localStorage.removeItem('henaos_token'); if (!response.ok) throw new Error(body.msg || 'Error de API'); return body.data ?? body }
export const get = <T,>(path: string) => request<T>(path)
export const post = <T,>(path: string, data: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(data) })
export const put = <T,>(path: string, data: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(data) })
export const patch = <T,>(path: string, data: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(data) })
export const del = <T = unknown>(path: string) => request<T>(path, { method: 'DELETE' })
