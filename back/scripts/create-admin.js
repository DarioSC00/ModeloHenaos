import bcrypt from 'bcryptjs'
import { pool } from '../src/config/database.js'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })
const name = (await rl.question('Nombre del superadmin: ')).trim()
const email = (await rl.question('Correo del superadmin: ')).trim().toLowerCase()
const password = await rl.question('Contraseña del superadmin: ', { mask: '*' })
rl.close()
if (!name || !email || !password) throw new Error('Nombre, correo y contraseña son obligatorios')
const passwordHash = await bcrypt.hash(password, 12)
await pool.execute(`INSERT INTO users (name, email, password_hash, role)
	VALUES (?, ?, ?, 'superadmin')
	ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash), role = 'superadmin', status = TRUE`, [name, email, passwordHash])
console.log(`Superadmin configurado: ${email}`)
await pool.end()
