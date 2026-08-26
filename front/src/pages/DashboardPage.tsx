import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Button } from 'react-bootstrap'
import { getSummary, type Summary } from '../features/dashboard/dashboard.service'
import { toast } from 'react-toastify'

export function DashboardPage({ refresh }: { refresh: number }) {
  const [data, setData] = useState<Summary>({ products: 0, categories: 0, sales: 0, purchases: 0, lowStock: 0 })

  useEffect(() => {
    getSummary()
      .then(setData)
      .catch(() => toast.error('No se pudo cargar el dashboard'))
  }, [refresh])

  return (
    <section className="content">
      <div className="heading">
        <div>
          <span className="eyebrow">RESUMEN OPERATIVO</span>
          <h1>Buenos días, admin.</h1>
          <p>Una vista clara de lo que está pasando en tu tienda.</p>
        </div>
        <Button className="accent" onClick={() => toast.info('Reporte preparado')}>
          <Icon icon="solar:download-minimalistic-linear" /> Exportar reporte
        </Button>
      </div>
      <div className="kpis">
        <Kpi icon="solar:wallet-money-linear" label="Ventas acumuladas" value={`$ ${data.sales.toFixed(2)}`} tone="cyan" />
        <Kpi icon="solar:bag-3-linear" label="Compras acumuladas" value={`$ ${data.purchases.toFixed(2)}`} tone="violet" />
        <Kpi icon="solar:box-linear" label="Productos activos" value={String(data.products)} tone="lime" />
        <Kpi icon="solar:danger-triangle-linear" label="Stock agotado" value={String(data.lowStock)} tone="pink" />
      </div>
      <div className="hero-panel">
        <div>
          <span className="eyebrow">CENTRO DE CONTROL</span>
          <h2>
            Decisiones rápidas.<br />
            Operación bajo control.
          </h2>
          <p>Administra catálogo, inventario y movimiento desde un solo lugar.</p>
        </div>
        <Icon icon="solar:graph-up-linear" />
      </div>
    </section>
  )
}

function Kpi({ icon, label, value, tone }: { icon: string; label: string; value: string; tone: string }) {
  return (
    <article className="kpi">
      <span className={`kpi-icon ${tone}`}>
        <Icon icon={icon} />
      </span>
      <small>{label}</small>
      <strong>{value}</strong>
      <em>
        <i /> Datos en vivo
      </em>
    </article>
  )
}
