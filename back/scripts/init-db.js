import fs from 'node:fs/promises'
import path from 'node:path'
import mysql from 'mysql2/promise'
import { fileURLToPath } from 'node:url'
import { env } from '../src/config/env.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const schema = await fs.readFile(path.join(currentDir, '../database/schema.sql'), 'utf8')
const connection = await mysql.createConnection({ ...env.database, multipleStatements: true })
await connection.query(schema)
await connection.end()
console.log(`Base de datos ${env.database.name} creada y lista.`)
