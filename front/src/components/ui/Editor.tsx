import { useState, useEffect } from 'react'
import { Offcanvas, Form, Button, Modal } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { listCategories, createCategory, type Category } from '../../features/categories/categories.service'
import { listProducts, createProduct, listClients, listSuppliers, type Product, type Client, type Supplier } from '../../features/catalog/catalog.service'
import type { Kind } from '../../hooks/useEntities'
import { toast } from 'react-toastify'

export function Editor({
  kind,
  initial,
  onClose,
  onSave,
}: {
  kind: Kind | null
  initial?: any
  onClose: () => void
  onSave: (data: Record<string, unknown>) => Promise<void>
}) {
  const [form, setForm] = useState<Record<string, string>>({})
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  // Modal states for Quick Creation
  const [showCatModal, setShowCatModal] = useState(false)
  const [showProdModal, setShowProdModal] = useState(false)

  // Forms for Quick Creation
  const [catForm, setCatForm] = useState({ name: '', description: '' })
  const [prodForm, setProdForm] = useState({ code: '', name: '', price: '', category_id: '' })

  const set = (key: string, value: string) => setForm((old) => ({ ...old, [key]: value }))

  const loadData = () => {
    if (kind === 'products' || showProdModal) listCategories().then(setCategories)
    if (kind === 'purchases') { 
      listProducts().then(setProducts)
      listSuppliers().then(setSuppliers).catch(() => console.warn('Sin ruta de suppliers'))
    }
    if (kind === 'sales') { 
      listProducts().then(setProducts)
      listClients().then(setClients).catch(() => console.warn('Sin ruta de clients'))
    }
  }

  useEffect(() => {
    if (!kind) return
    setForm(initial ? { ...initial, date: initial.purchase_date || initial.sale_date, date_exp: initial.expiration_date ? String(initial.expiration_date).split('T')[0] : '' } : {})
    loadData()
  }, [kind, initial])

  if (!kind) return null

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data =
      kind === 'categories'
        ? { name: form.name, description: form.description }
        : kind === 'products'
        ? {
            code: form.code,
            name: form.name,
            brand: form.brand || 'Sin marca',
            size: form.size || '',
            unit: form.unit || 'unidad',
            price_purchase: Number(form.price_purchase || 0),
            price: Number(form.price || 0),
            price_wholesale: Number(form.price_wholesale || 0),
            price_retail: Number(form.price_retail || 0),
            margin_wholesale: Number(form.margin_wholesale || 20),
            margin_retail: Number(form.margin_retail || 25),
            description: form.description || '',
            stock: Number(form.stock || 0),
            category: Number(form.category || form.category_id),
            expiration_date: form.date_exp || null
          }
        : kind === 'purchases'
        ? {
            code: form.code,
            reference: form.reference || form.code,
            supplier_id: form.supplier_id,
            purchase_date: form.date,
            total: Number(form.total || 0),
            notes: form.notes || '',
            observations: form.observations || '',
            product_id: form.product_id,
            quantity: Number(form.quantity || 0),
            unit_cost: Number(form.unit_cost || 0),
          }
        : {
            code: form.code,
            reference: form.reference || form.code,
            client_id: form.client_id,
            sale_date: form.date,
            total: Number(form.total || 0),
            pass: Number(form.pass || 0),
            payment_type: form.payment_type || 'contado',
            notes: form.notes || '',
            product_id: form.product_id,
            quantity: Number(form.quantity || 0),
            unit_price: Number(form.unit_price || 0),
          }
    await onSave(data)
  }

  // Quick Action Handlers
  const handleQuickCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!catForm.name) return
    try {
      await createCategory({ name: catForm.name, description: catForm.description })
      toast.success('Categoría creada con éxito')
      setShowCatModal(false)
      setCatForm({ name: '', description: '' })
      loadData() // refresh list
    } catch (e: any) { toast.error('Error al crear categoría') }
  }

  const handleQuickCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prodForm.name) return
    try {
      await createProduct({
        code: prodForm.code,
        name: prodForm.name,
        price: Number(prodForm.price),
        category: Number(prodForm.category_id),
        brand: 'Genérico',
        price_purchase: 0,
        price_wholesale: 0,
        price_retail: 0
      })
      toast.success('Producto creado con éxito')
      setShowProdModal(false)
      setProdForm({ code: '', name: '', price: '', category_id: '' })
      loadData()
    } catch (e: any) { toast.error('Error al crear producto') }
  }

  const title =
    kind === 'categories'
      ? 'categoría'
      : kind === 'products'
      ? 'producto'
      : kind === 'purchases'
      ? 'compra'
      : 'venta'

  return (
    <>
      <Offcanvas show placement="end" onHide={onClose} style={{ width: '500px' }}>
        <Offcanvas.Header closeButton>
          <div>
            <span className="eyebrow">{initial ? 'EDITAR' : 'NUEVO REGISTRO'}</span>
            <Offcanvas.Title>
              {initial ? 'Editar' : 'Nueva'} {title}
            </Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={submit}>
            {kind === 'categories' && (
              <>
                <Field label="Nombre" value={form.name} set={(v) => set('name', v)} required />
                <Field label="Descripción" value={form.description} set={(v) => set('description', v)} required />
              </>
            )}
            
            {kind === 'products' && (
              <>
                <div className="split">
                   <Field label="Código" value={form.code} set={(v) => set('code', v)} required />
                   <Field label="Nombre" value={form.name} set={(v) => set('name', v)} required />
                </div>
                <div className="split">
                   <Field label="Marca" value={form.brand} set={(v) => set('brand', v)} required />
                   <Field label="Talla / Peso / Tamaño" value={form.size} set={(v) => set('size', v)} />
                </div>
                <div className="split">
                   <Select
                      label="Unidad de medida"
                      value={form.unit || 'unidad'}
                      set={(v) => set('unit', v)}
                      options={[['unidad','Unidad'], ['caja','Caja'], ['paquete','Paquete'], ['litro','Litro'], ['kg','Kg'], ['m','Metro'], ['gal','Galón']]}
                    />
                   <Field label="Stock" type="number" min="0" value={form.stock} set={(v) => set('stock', v)} />
                </div>
                <div className="split">
                   <Field label="Precio Costo / Compra" type="number" min="0" value={form.price_purchase} set={(v) => set('price_purchase', v)} required />
                   <Field label="Precio Base (General)" type="number" min="0" value={form.price} set={(v) => set('price', v)} required />
                </div>
                <div className="split">
                   <Field label="Precio Mayorista" type="number" min="0" value={form.price_wholesale} set={(v) => set('price_wholesale', v)} required />
                   <Field label="Precio al Detal" type="number" min="0" value={form.price_retail} set={(v) => set('price_retail', v)} required />
                </div>
                
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <Select
                      label="Categoría"
                      value={form.category || form.category_id}
                      set={(v) => set('category', v)}
                      options={categories.map((c) => [String(c.id), c.name])}
                    />
                  </div>
                  <Button size="sm" variant="outline-primary" style={{ marginBottom: '4px' }} onClick={() => setShowCatModal(true)}>
                    <Icon icon="solar:add-circle-linear" /> Crear
                  </Button>
                </div>

                <Field label="Fecha de Vencimiento" type="date" value={form.date_exp} set={(v) => set('date_exp', v)} />
                <Field label="Descripción" value={form.description} set={(v) => set('description', v)} />
              </>
            )}

            {(kind === 'purchases' || kind === 'sales') && (
              <>
                <div className="split">
                  <Field label="Código" value={form.code} set={(v) => set('code', v)} required />
                  <Field label="Referencia" value={form.reference} set={(v) => set('reference', v)} />
                </div>
                
                <div className="split">
                  <Field label="Fecha" type="date" value={form.date} set={(v) => set('date', v)} required />
                  <Field label="Total Factura" type="number" min="0" value={form.total} set={(v) => set('total', v)} />
                </div>

                {kind === 'purchases' && (
                  <Select
                    label="Proveedor"
                    value={form.supplier_id}
                    set={(v) => set('supplier_id', v)}
                    options={suppliers.map((s) => [String(s.id), s.name])}
                  />
                )}
                {kind === 'sales' && (
                  <>
                    <div className="split">
                      <Select
                        label="Cliente"
                        value={form.client_id}
                        set={(v) => set('client_id', v)}
                        options={clients.map((c) => [String(c.id), c.full_name])}
                      />
                      <Select
                        label="Tipo de Pago"
                        value={form.payment_type || 'contado'}
                        set={(v) => set('payment_type', v)}
                        options={[['contado','Contado'], ['credito','Crédito'], ['mixto','Mixto']]}
                      />
                    </div>
                    <div className="split">
                      <Field label="Abono" type="number" min="0" value={form.pass} set={(v) => set('pass', v)} />
                      <Field label="Notas" value={form.notes} set={(v) => set('notes', v)} />
                    </div>
                  </>
                )}

                {!initial && (
                  <>
                    <hr style={{ borderColor: 'hsl(var(--border-color))' }} />
                    <p style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', marginBottom: '12px' }}>AGREGAR PRIMER ARTÍCULO AL DETALLE</p>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', marginBottom: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <Select
                          label="Producto"
                          value={form.product_id}
                          set={(v) => set('product_id', v)}
                          options={products.map((p) => [String(p.id), p.name])}
                        />
                      </div>
                      <Button size="sm" variant="outline-primary" style={{ marginBottom: '4px' }} onClick={() => { listCategories().then(setCategories); setShowProdModal(true) }}>
                        <Icon icon="solar:add-circle-linear" /> Crear
                      </Button>
                    </div>

                    <div className="split">
                      <Field label="Cantidad" type="number" min="1" value={form.quantity} set={(v) => set('quantity', v)} required />
                      <Field
                        label={kind === 'purchases' ? 'Costo unitario' : 'Precio unitario'}
                        type="number"
                        min="0"
                        value={kind === 'purchases' ? form.unit_cost : form.unit_price}
                        set={(v) => set(kind === 'purchases' ? 'unit_cost' : 'unit_price', v)}
                        required
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <Button className="accent full" type="submit">
              Guardar cambios <Icon icon="solar:check-circle-linear" />
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal Crear Categoría Rápida */}
      <Modal show={showCatModal} onHide={() => setShowCatModal(false)} centered contentClassName="premium-modal">
        <Modal.Header closeButton>
          <Modal.Title>Crear Categoría Rápida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleQuickCreateCategory}>
            <Field label="Nombre" value={catForm.name} set={(v) => setCatForm(o => ({...o, name: v}))} required />
            <Field label="Descripción" value={catForm.description} set={(v) => setCatForm(o => ({...o, description: v}))} required />
            <Button className="accent full" type="submit" style={{ marginTop: '16px' }}>
              Crear Categoría
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Crear Producto Rápido */}
      <Modal show={showProdModal} onHide={() => setShowProdModal(false)} centered contentClassName="premium-modal">
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto Rápido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleQuickCreateProduct}>
            <div className="split">
              <Field label="Código" value={prodForm.code} set={(v) => setProdForm(o => ({...o, code: v}))} required />
              <Field label="Nombre" value={prodForm.name} set={(v) => setProdForm(o => ({...o, name: v}))} required />
            </div>
            <div className="split">
              <Field label="Precio (Base)" type="number" min="0" value={prodForm.price} set={(v) => setProdForm(o => ({...o, price: v}))} required />
              <Select
                label="Categoría"
                value={prodForm.category_id}
                set={(v) => setProdForm(o => ({...o, category_id: v}))}
                options={categories.map((c) => [String(c.id), c.name])}
              />
            </div>
            <Button className="accent full" type="submit" style={{ marginTop: '16px' }}>
              Crear Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

function Field({
  label,
  value = '',
  set,
  type = 'text',
  min,
  required = false,
}: {
  label: string
  value?: string
  set: (value: string) => void
  type?: string
  min?: string
  required?: boolean
}) {
  return (
    <Form.Group className="field">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} min={min} value={value} required={required} onChange={(event) => set(event.target.value)} />
    </Form.Group>
  )
}

function Select({
  label,
  value = '',
  set,
  options,
}: {
  label: string
  value?: string
  set: (value: string) => void
  options: Array<[string, string]>
}) {
  return (
    <Form.Group className="field" style={{ marginBottom: '16px' }}>
      <Form.Label>{label}</Form.Label>
      <Form.Select required value={value || ''} onChange={(event) => set(event.target.value)}>
        <option value="">Selecciona una opción</option>
        {options.map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}
