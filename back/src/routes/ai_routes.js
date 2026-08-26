import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'
import * as Product from '../models/producto_model.js'

const aiRouter = Router()

// Initialize safely
let ai = null
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  }
} catch (e) {
  console.error('Error init AI', e)
}

aiRouter.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    if (!message) return res.status(400).json({ ok: false, msg: 'Mensaje requerido' })
    
    // Gather minimal context
    const products = await Product.findAll()
    const context = `Contexto del sistema (LOS HENAOS):
Hay ${products.length} productos registrados.
Productos (muestra): ${products.slice(0, 5).map(p => `${p.name} (Stock: ${p.stock}, Precio: $${p.price})`).join(', ')}.
Eres un asistente de IA integrado en el panel de administración. Responde de forma concisa y premium.`

    if (!ai) {
      return res.json({ ok: true, reply: '¡Hola! (Modo Simulación) He recibido tu mensaje. Como no tengo la clave GEMINI_API_KEY configurada, no puedo analizar tus datos reales, pero te confirmo que el sistema de IA está listo para operar.' })
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${context}\n\nUsuario: ${message}`
    })

    res.json({ ok: true, reply: response.text })
  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({ ok: false, msg: 'Error al procesar la respuesta de la IA' })
  }
})

export default aiRouter
