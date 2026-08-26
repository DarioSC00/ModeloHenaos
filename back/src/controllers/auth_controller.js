import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import * as User from '../models/usuario_model.js'

export async function login(req, res, next) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    if (!email || !password) return res.status(400).json({ ok: false, msg: 'Correo y contraseña son obligatorios' })
    const user = await User.findByEmail(email)
    if (!user || !user.status || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' })
    const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: '8h' })
    const { password_hash, ...publicUser } = user
    res.json({ ok: true, data: { token, user: publicUser } })
  } catch (error) { next(error) }
}

export async function me(req, res) { res.json({ ok: true, data: req.user }) }
