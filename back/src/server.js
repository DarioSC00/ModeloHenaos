import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { checkDatabaseConnection } from './config/database.js'
import categoriaRoutes from './routes/categoria_routes.js'
import productoRoutes from './routes/producto_routes.js'
import compraRoutes from './routes/compra_routes.js'
import ventaRoutes from './routes/venta_routes.js'
import dashboardRoutes from './routes/dashboard_routes.js'
import dashboardDetailRoutes from './routes/dashboard_detalle_routes.js'
import notificationRoutes from './routes/notificacion_routes.js'
import authRoutes from './routes/auth_routes.js'
import { requireAuth } from './middleware/auth_middleware.js'
import catalogoExtraRoutes from './routes/catalogo_extra_routes.js'
import devolucionRoutes from './routes/devolucion_routes.js'
import aiRoutes from './routes/ai_routes.js'

const app = express()
app.use(helmet())
app.use(cors({ origin: env.clientUrl }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ ok: true, msg: 'API funcionando' }))
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', requireAuth, dashboardRoutes)
app.use('/api/dashboard/details', requireAuth, dashboardDetailRoutes)
app.use('/api/notifications', requireAuth, notificationRoutes)
app.use('/api/categories', requireAuth, categoriaRoutes)
app.use('/api/products', requireAuth, productoRoutes)
app.use('/api/purchases', requireAuth, compraRoutes)
app.use('/api/sales', requireAuth, ventaRoutes)
app.use('/api/catalog', requireAuth, catalogoExtraRoutes)
app.use('/api/devolutions', requireAuth, devolucionRoutes)
app.use('/api/ai', requireAuth, aiRoutes)


app.use((error, req, res, next) => {
  console.error(error)
  if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, msg: 'Ya existe un registro con ese valor único' })
  if (error.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ ok: false, msg: 'La referencia indicada no existe' })
  const status = error.status || 500
  const msg = error.msg || 'Error interno del servidor'
  res.status(status).json({ ok: false, msg, error: error.message })
})

app.listen(env.port, async () => {
  console.log(`LOS HENAOS API ejecutándose en http://localhost:${env.port}`)
  try { await checkDatabaseConnection(); console.log('Conexión MySQL lista') }
  catch (error) { console.warn(`MySQL no disponible: ${error.message}`) }
})
