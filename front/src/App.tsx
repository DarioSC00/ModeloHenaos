import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'

// Pages & Layout
import { MainLayout } from './components/layout/MainLayout'
import { DashboardPage } from './pages/DashboardPage'
import { EntityPage } from './pages/EntityPage'

// Components
import { Editor } from './components/ui/Editor'
import { DetailPanel } from './components/ui/DetailPanel'
import { NotificationPanel, ProfilePanel } from './components/ui/Panels'

// Services & Hooks
import { useEntities, type Kind } from './hooks/useEntities'
import { listNotifications, markNotificationRead, type Notification } from './features/notifications/notifications.service'
import { LoginPage } from './features/auth/LoginPage'
import type { SessionUser } from './features/auth/auth.service'

export default function App() {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const saved = localStorage.getItem('henaos_user')
    return saved ? JSON.parse(saved) : null
  })

  // Global UI State
  const [kind, setKind] = useState<Kind | null>(null)
  const [editing, setEditing] = useState<{ kind: Kind; row: any } | null>(null)
  const [detail, setDetail] = useState<any>(null)
  const [refresh, setRefresh] = useState(0)
  
  // Notification State
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const reload = () => setRefresh((value) => value + 1)
  
  const { saveEntity, removeEntity } = useEntities(editing?.kind || kind || 'products', refresh)

  const handleSave = async (data: Record<string, unknown>) => {
    try {
      const activeKind = editing?.kind || kind
      if (!activeKind) return
      
      await saveEntity(!!editing, editing?.row?.id ?? null, data)
      setKind(null)
      setEditing(null)
      reload()
    } catch (error) {
      toast.error('Error al guardar')
    }
  }

  const handleRemove = async (itemKind: Kind, id: number) => {
    const success = await removeEntity(id)
    if (success) reload()
  }

  const logout = () => {
    localStorage.removeItem('henaos_token')
    localStorage.removeItem('henaos_user')
    setUser(null)
    toast.info('Sesión cerrada')
  }

  useEffect(() => {
    if (user) {
      listNotifications()
        .then(setNotifications)
        .catch(() => undefined)
    }
  }, [user, refresh])

  if (!user) {
    return (
      <LoginPage
        onLogin={(token, loggedUser) => {
          localStorage.setItem('henaos_token', token)
          localStorage.setItem('henaos_user', JSON.stringify(loggedUser))
          setUser(loggedUser)
        }}
      />
    )
  }

  const unreadCount = notifications.filter((item) => !item.is_read).length

  return (
    <>
      <Routes>
        <Route
          element={
            <MainLayout
              user={user}
              unreadCount={unreadCount}
              onLogout={logout}
              onShowNotifications={() => setShowNotifications(true)}
              onShowProfile={() => setShowProfile(true)}
            />
          }
        >
          <Route path="/" element={<DashboardPage refresh={refresh} />} />
          <Route
            path="/categorias"
            element={
              <EntityPage
                title="Categorías"
                kind="categories"
                refresh={refresh}
                onCreate={() => setKind('categories')}
                onEdit={(row) => setEditing({ kind: 'categories', row })}
                onDetail={setDetail}
                onRemove={handleRemove}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <EntityPage
                title="Productos"
                kind="products"
                refresh={refresh}
                onCreate={() => setKind('products')}
                onEdit={(row) => setEditing({ kind: 'products', row })}
                onDetail={setDetail}
                onRemove={handleRemove}
              />
            }
          />
          <Route
            path="/compras"
            element={
              <EntityPage
                title="Compras"
                kind="purchases"
                refresh={refresh}
                onCreate={() => setKind('purchases')}
                onEdit={(row) => setEditing({ kind: 'purchases', row })}
                onDetail={setDetail}
                onRemove={handleRemove}
              />
            }
          />
          <Route
            path="/ventas"
            element={
              <EntityPage
                title="Ventas"
                kind="sales"
                refresh={refresh}
                onCreate={() => setKind('sales')}
                onEdit={(row) => setEditing({ kind: 'sales', row })}
                onDetail={setDetail}
                onRemove={handleRemove}
              />
            }
          />
        </Route>
      </Routes>

      <Editor
        kind={editing?.kind || kind}
        initial={editing?.row}
        onClose={() => {
          setKind(null)
          setEditing(null)
        }}
        onSave={handleSave}
      />
      
      <DetailPanel item={detail} onClose={() => setDetail(null)} />
      
      <NotificationPanel
        notifications={notifications}
        show={showNotifications}
        onClose={() => setShowNotifications(false)}
        onRead={async (id) => {
          await markNotificationRead(id)
          setNotifications((items) =>
            items.map((item) => (item.id === id ? { ...item, is_read: true } : item))
          )
        }}
      />
      
      <ProfilePanel
        user={user}
        show={showProfile}
        onClose={() => setShowProfile(false)}
        onLogout={logout}
      />
    </>
  )
}
