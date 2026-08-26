import 'dotenv/config'

const required = ['DB_HOST', 'DB_NAME', 'DB_USER']
const missing = required.filter((key) => !process.env[key])
if (missing.length) console.warn(`Variables faltantes: ${missing.join(', ')}. Configura el archivo .env.`)

export const env = {
  port: Number(process.env.PORT || 3000),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-change-this-secret',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    name: process.env.DB_NAME || 'los_henaos',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
}
