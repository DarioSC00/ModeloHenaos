import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { findPublicById } from '../models/usuario_model.js'

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ ok: false, msg: 'Autenticación requerida' })
    const payload = jwt.verify(token, env.jwtSecret)
    const user = await findPublicById(payload.sub)
    if (!user || !user.status) return res.status(401).json({ ok: false, msg: 'Usuario no autorizado' })
    req.user = user
    next()
  } catch (error) { res.status(401).json({ ok: false, msg: 'Token inválido o expirado' }) }
}
