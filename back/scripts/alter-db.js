import fs from 'node:fs/promises'
import path from 'node:path'
import mysql from 'mysql2/promise'
import { fileURLToPath } from 'node:url'
import { env } from '../src/config/env.js'

async function runAlterations() {
  const connection = await mysql.createConnection({ ...env.database, multipleStatements: true })
  
  const sql = `
  USE los_henaos;

  -- 1. Create clients table
  CREATE TABLE IF NOT EXISTS clients (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type_document ENUM('CC', 'NIT', 'CE', 'TI', 'PAS') NOT NULL,
    document VARCHAR(20) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(190) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(50) NOT NULL,
    cupo DECIMAL(12,2) NOT NULL DEFAULT 0,
    status ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
    client_type ENUM('mayorista', 'detal') NOT NULL DEFAULT 'detal',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_clients_doc (type_document, document)
  );

  -- 2. Add DEVOLUTIONS
  CREATE TABLE IF NOT EXISTS devolutions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    sale_id INT UNSIGNED NOT NULL,
    motivo VARCHAR(500) NOT NULL,
    total_devolucion DECIMAL(12,2) NOT NULL DEFAULT 0,
    user_id INT UNSIGNED NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_devolutions_sale FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    CONSTRAINT fk_devolutions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
  );

  CREATE TABLE IF NOT EXISTS devolution_details (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    devolution_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    cantidad_devuelta INT UNSIGNED NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    producto_reemplazo_id INT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_devdetail_dev FOREIGN KEY (devolution_id) REFERENCES devolutions(id) ON DELETE CASCADE,
    CONSTRAINT fk_devdetail_prod FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    CONSTRAINT fk_devdetail_reemplazo FOREIGN KEY (producto_reemplazo_id) REFERENCES products(id) ON DELETE SET NULL
  );
  `

  await connection.query(sql)
  console.log("Tablas base creadas (clients, devolutions, devolution_details)")

  const queries = [
    // PRODUCTS
    "ALTER TABLE products ADD COLUMN code VARCHAR(30) AFTER id;",
    "UPDATE products SET code = CONCAT('PROD-', id) WHERE code IS NULL;",
    "ALTER TABLE products ADD UNIQUE INDEX uq_products_code (code);",
    "ALTER TABLE products ADD COLUMN brand VARCHAR(50) NOT NULL DEFAULT 'Sin marca' AFTER name;",
    "ALTER TABLE products ADD COLUMN size VARCHAR(30) NULL AFTER brand;",
    "ALTER TABLE products ADD COLUMN unit ENUM('unidad', 'litro', 'galon', 'caja', 'paquete', 'metro', 'kg', 'ml', 'l', 'gal', 'm') NOT NULL DEFAULT 'unidad' AFTER size;",
    "ALTER TABLE products ADD COLUMN estado ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO';",
    "ALTER TABLE products ADD COLUMN expiration_date DATE NULL;",
    "ALTER TABLE products ADD COLUMN price_purchase DECIMAL(12,2) NOT NULL DEFAULT 0;",
    "ALTER TABLE products ADD COLUMN price_wholesale DECIMAL(12,2) NOT NULL DEFAULT 0;",
    "ALTER TABLE products ADD COLUMN price_retail DECIMAL(12,2) NOT NULL DEFAULT 0;",
    "ALTER TABLE products ADD COLUMN margin_wholesale DECIMAL(5,2) NOT NULL DEFAULT 20;",
    "ALTER TABLE products ADD COLUMN margin_retail DECIMAL(5,2) NOT NULL DEFAULT 25;",
    
    // SALES
    "ALTER TABLE sales ADD COLUMN pass DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER total;",
    "ALTER TABLE sales ADD COLUMN outstanding_balance DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER pass;",
    "ALTER TABLE sales ADD COLUMN client_id INT UNSIGNED NULL AFTER reference;",
    "ALTER TABLE sales ADD COLUMN user_id INT UNSIGNED NULL AFTER client_id;",
    "ALTER TABLE sales ADD COLUMN payment_type ENUM('contado', 'credito', 'mixto') NOT NULL DEFAULT 'contado';",
    "ALTER TABLE sales ADD COLUMN monto_contado DECIMAL(12,2) NOT NULL DEFAULT 0;",
    "ALTER TABLE sales ADD COLUMN monto_credito DECIMAL(12,2) NOT NULL DEFAULT 0;",
    "ALTER TABLE sales ADD COLUMN pago_con_credito BOOLEAN NOT NULL DEFAULT FALSE;",
    "ALTER TABLE sales MODIFY COLUMN status ENUM('completed', 'cancelled', 'activa', 'devolucion') NOT NULL DEFAULT 'completed';",
    
    // PURCHASES
    "ALTER TABLE purchases ADD COLUMN user_id INT UNSIGNED NULL AFTER supplier;"
  ]

  for (const q of queries) {
    try {
      await connection.query(q)
      console.log("Éxito:", q.substring(0, 50))
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME' || error.code === 'ER_DUP_KEYNAME') {
        console.log("Ya existe el campo o índice, saltando:", q.substring(0, 50))
      } else {
        console.error("Error en query:", q, error.message)
      }
    }
  }

  await connection.end()
  console.log("Migración finalizada.")
}

runAlterations().catch(console.error)
