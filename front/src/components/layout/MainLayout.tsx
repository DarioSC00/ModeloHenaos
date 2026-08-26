import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import type { SessionUser } from '../../features/auth/auth.service'
import { AIAssistant } from '../ai/AIAssistant'

const navigation = [
  { label: 'Dashboard', path: '/', icon: 'solar:widget-5-linear' },
  { label: 'Compras', path: '/compras', icon: 'solar:inbox-in-linear' },
  { label: 'Ventas', path: '/ventas', icon: 'solar:cart-large-minimalistic-linear' },
  { label: 'Productos', path: '/productos', icon: 'solar:box-linear' },
  { label: 'Categorías', path: '/categorias', icon: 'solar:widget-4-linear' },
]

export function MainLayout({
  user,
  unreadCount,
  onLogout,
  onShowNotifications,
  onShowProfile,
}: {
  user: SessionUser
  unreadCount: number
  onLogout: () => void
  onShowNotifications: () => void
  onShowProfile: () => void
}) {
  const location = useLocation()
  const currentSection = navigation.find((item) => item.path === location.pathname)?.label ?? 'Dashboard'
  const [showAI, setShowAI] = useState(false)

  return (
    <div className="shell">
      <aside>
        <div className="brand">
          <span>
            <Icon icon="solar:layers-minimalistic-linear" />
          </span>
          <b>
            LOS HENAOS<small>admin studio</small>
          </b>
        </div>

        <nav>
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}>
              <Icon icon={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="aside-foot" style={{ cursor: 'pointer', background: 'hsl(var(--accent-primary) / 0.1)' }} onClick={() => setShowAI(true)}>
          <Icon icon="solar:magic-stick-3-linear" style={{ color: 'hsl(var(--accent-primary))' }} />
          <div>
            <b style={{ color: 'hsl(var(--accent-primary))' }}>HenaoBot</b>
            <small style={{ color: 'hsl(var(--accent-primary))' }}>Asistente IA</small>
          </div>
        </div>
        <button className="logout-button" onClick={onLogout}>
          <Icon icon="solar:logout-2-linear" /> <span>Cerrar sesión</span>
        </button>
      </aside>
      <main>
        <header>
          <div className="crumb">
            <span>Workspace</span>
            <Icon icon="solar:alt-arrow-right-linear" />
            <b>{currentSection}</b>
          </div>
          <div className="header-actions">
            <button
              className="icon-action"
              title="Notificaciones"
              aria-label="Notificaciones"
              onClick={onShowNotifications}
            >
              <Icon icon="solar:bell-linear" />
              {unreadCount > 0 && <sup>{unreadCount}</sup>}
            </button>
            <button className="profile-trigger" title="Ver perfil" onClick={onShowProfile}>
              <span className="avatar">{user.name.slice(0, 2).toUpperCase()}</span>
              <span>{user.name}</span>
              <Icon icon="solar:alt-arrow-down-linear" />
            </button>
          </div>
        </header>
        <Outlet />
      </main>

      <AIAssistant show={showAI} onClose={() => setShowAI(false)} />
    </div>
  )
}
