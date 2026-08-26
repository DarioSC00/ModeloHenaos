import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Button } from 'react-bootstrap'
import { useEntities, type Kind } from '../hooks/useEntities'

export function EntityPage({
  title,
  kind,
  refresh,
  onCreate,
  onEdit,
  onDetail,
  onRemove,
}: {
  title: string
  kind: Kind
  refresh: number
  onCreate: () => void
  onEdit: (row: any) => void
  onDetail: (row: any) => void
  onRemove: (kind: Kind, id: number) => Promise<void>
}) {
  const { rows, loading } = useEntities(kind, refresh)
  const [query, setQuery] = useState('')

  const filtered = rows.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="content">
      <div className="heading">
        <div>
          <span className="eyebrow">GESTIÓN / {kind.toUpperCase()}</span>
          <h1>{title}</h1>
          <p>Información conectada directamente con MySQL.</p>
        </div>
        <Button className="accent" onClick={onCreate}>
          <Icon icon="solar:add-circle-linear" /> Nuevo{' '}
          {kind === 'categories' ? 'categoría' : kind === 'products' ? 'producto' : kind === 'purchases' ? 'compra' : 'venta'}
        </Button>
      </div>
      <div className="list-panel">
        <div className="list-toolbar">
          <div className="search">
            <Icon icon="solar:magnifer-linear" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Buscar en ${title.toLowerCase()}`}
            />
          </div>
          <span className="count-pill">{filtered.length} registros</span>
        </div>
        {loading ? (
          <div className="loading">
            <Icon icon="solar:refresh-linear" className="spin-icon" /> Cargando datos...
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <Icon icon="solar:box-minimalistic-linear" />
            <h2>{query ? 'Sin resultados' : `Aún no hay ${title.toLowerCase()}`}</h2>
            <p>Empieza agregando tu primer registro.</p>
            <button onClick={onCreate}>
              Crear registro <Icon icon="solar:arrow-right-linear" />
            </button>
          </div>
        ) : (
          <div className="rows">
            {filtered.map((row) => (
              <div className="data-row" key={row.id}>
                <div className="row-mark">
                  <Icon
                    icon={
                      row.name
                        ? 'solar:box-linear'
                        : row.supplier
                        ? 'solar:inbox-in-linear'
                        : row.reference
                        ? 'solar:cart-large-minimalistic-linear'
                        : 'solar:widget-4-linear'
                    }
                  />
                </div>
                <div className="row-main">
                  <strong>{row.name || row.reference}</strong>
                  <span>
                    {String(
                      row.description ||
                        row.supplier ||
                        row.categoryName ||
                        row.sale_date ||
                        row.purchase_date ||
                        ''
                    )}
                  </span>
                </div>
                <b className="row-value">
                  {row.price !== undefined
                    ? `$ ${Number(row.price).toFixed(2)}`
                    : row.total !== undefined
                    ? `$ ${Number(row.total).toFixed(2)}`
                    : row.status
                    ? 'Activa'
                    : ''}
                </b>
                <div className="row-actions">
                  <button title="Ver detalle" aria-label="Ver detalle" onClick={() => onDetail(row)}>
                    <Icon icon="solar:eye-linear" />
                  </button>
                  <button title="Editar registro" aria-label="Editar registro" onClick={() => onEdit(row)}>
                    <Icon icon="solar:pen-2-linear" />
                  </button>
                  <button
                    className="danger"
                    title="Eliminar registro"
                    aria-label="Eliminar registro"
                    onClick={() => onRemove(kind, row.id)}
                  >
                    <Icon icon="solar:trash-bin-trash-linear" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
