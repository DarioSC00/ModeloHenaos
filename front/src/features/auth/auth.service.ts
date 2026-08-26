import { request } from '../../services/api'

export type SessionUser = { id: number; name: string; email: string; role: string; status: boolean }
export type LoginResponse = { token: string; user: SessionUser }

export function login(email: string, password: string) { return request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }) }
