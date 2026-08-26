import { get, patch } from '../../services/api'

export type Notification = { id: number; title: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; is_read: boolean; created_at: string }
export const listNotifications = () => get<{ notifications: Notification[] }>('/notifications').then((response) => response.notifications)
export const markNotificationRead = (id: number) => patch(`/notifications/${id}/read`, {})
