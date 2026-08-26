import { Offcanvas } from 'react-bootstrap'

export function DetailPanel({ item, onClose }: { item: any; onClose: () => void }) {
  return (
    <Offcanvas show={Boolean(item)} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <div>
          <span className="eyebrow">DETALLE</span>
          <Offcanvas.Title>{item?.name || item?.reference}</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {item && (
          <div className="detail-grid">
            {Object.entries(item).map(([key, value]) => (
              <div key={key}>
                <small>{key.replaceAll('_', ' ')}</small>
                <strong>{String(value ?? '-')}</strong>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}
