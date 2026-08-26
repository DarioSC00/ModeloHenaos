import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'

// Importación de todos tus modelos
import * as Category from '../models/categoria_model.js'
import * as Client from '../models/cliente_model.js'
import * as Purchase from '../models/compra_model.js'
import * as Dashboard from '../models/dashboard_model.js'
import * as Notification from '../models/notificacion_model.js'
import * as Product from '../models/producto_model.js'
import * as Supplier from '../models/proveedor_model.js'
import * as User from '../models/usuario_model.js'
import * as Sale from '../models/venta_model.js'

const aiRouter = Router()

aiRouter.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    if (!message) return res.status(400).json({ ok: false, msg: 'Mensaje requerido' })

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.json({
        ok: true,
        reply: '¡Hola! Modo Simulación activo. Configura GEMINI_API_KEY en tu .env para conectar con la base de datos.'
      })
    }

    // 1. Cargar datos en paralelo desde los modelos principales
    const [
      categories,
      products,
      clients,
      suppliers,
      sales,
      purchases,
      notifications
    ] = await Promise.all([
      Category.findAll ? Category.findAll() : [],
      Product.findAll ? Product.findAll() : [],
      Client.findAll ? Client.findAll() : [],
      Supplier.findAll ? Supplier.findAll() : [],
      Sale.findAll ? Sale.findAll() : [],
      Purchase.findAll ? Purchase.findAll() : [],
      Notification.findAll ? Notification.findAll() : []
    ])

    // 2. Construir el contexto general del sistema "LOS HENAOS"
    const context = `Contexto General del Sistema (LOS HENAOS):

- Categorías (${categories.length}): ${categories.map(c => c.nombre || c.name).join(', ') || 'Ninguna registrada'}
- Productos Totales (${products.length}): ${products.slice(0, 8).map(p => `${p.nombre || p.name} (Stock: ${p.stock}, Precio: $${p.precio || p.price})`).join('; ') || 'Ninguno'}
- Clientes Registrados: ${clients.length}
- Proveedores Registrados: ${suppliers.length} (${suppliers.slice(0, 5).map(s => s.nombre || s.name).join(', ')})
- Total Ventas Realizadas: ${sales.length}
- Total Compras Registradas: ${purchases.length}
- Notificaciones Pendientes/Recientes: ${notifications.length}

Instrucciones para HenaoBot: Eres el asistente virtual del panel de administración de "LOS HENAOS". Responde a las dudas del usuario usando los datos proporcionados de forma concisa, clara y profesional.`

    // 3. Consultar a Gemini
    const ai = new GoogleGenAI({ apiKey })
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${context}\n\nUsuario: ${message}`
    })

    res.json({ ok: true, reply: response.text })
  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({ ok: false, msg: error.message || 'Error al procesar la respuesta de la IA' })
  }
})

export default aiRouter