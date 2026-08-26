import { Icon } from '@iconify/react'
import { Offcanvas, Button } from 'react-bootstrap'
import type { Notification } from '../../features/notifications/notifications.service'
import type { SessionUser } from '../../features/auth/auth.service'

export function NotificationPanel({
  notifications,
  show,
  onClose,
  onRead,
}: {
  notifications: Notification[]
  show: boolean
  onClose: () => void
  onRead: (id: number) => Promise<void>
}) {
  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <div>
          <span className="eyebrow">CENTRO DE AVISOS</span>
          <Offcanvas.Title>Notificaciones</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {notifications.length === 0 ? (
          <div className="empty">
            <Icon icon="solar:bell-off-linear" />
            <h2>Todo tranquilo</h2>
            <p>No tienes notificaciones nuevas.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <button
              className={`notification-item ${item.is_read ? 'read' : ''}`}
              key={item.id}
              onClick={() => onRead(item.id)}
            >
              <span className={`notification-dot ${item.type}`} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.message}</p>
                <small>{new Date(item.created_at).toLocaleString()}</small>
              </div>
            </button>
          ))
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export function ProfilePanel({
  user,
  show,
  onClose,
  onLogout,
}: {
  user: SessionUser
  show: boolean
  onClose: () => void
  onLogout: () => void
}) {
  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <div>
          <span className="eyebrow">CUENTA</span>
          <Offcanvas.Title>Ver perfil</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="profile-card">
          <div className="profile-avatar">{user.name.slice(0, 2).toUpperCase()}</div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span>{user.role}</span>
        </div>
        <div className="profile-info">
          <div>
            <small>Estado</small>
            <strong>Activo</strong>
          </div>
          <div>
            <small>Acceso</small>
            <strong>Panel administrativo</strong>
          </div>
        </div>
        <Button className="logout-wide" onClick={onLogout}>
          <Icon icon="solar:logout-2-linear" /> Cerrar sesión
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
