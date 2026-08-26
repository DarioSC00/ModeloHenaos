USE los_henaos;

CREATE TABLE IF NOT EXISTS clients (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type_document ENUM('CC','NIT','CE','TI','PAS') NOT NULL,
  document VARCHAR(20) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(190) NOT NULL,
  address VARCHAR(200) NOT NULL,
  city VARCHAR(50) NOT NULL,
  cupo DECIMAL(12,2) NOT NULL DEFAULT 0,
  status ENUM('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO',
  client_type ENUM('mayorista','detal') NOT NULL DEFAULT 'detal',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_clients_document_type (type_document, document),
  UNIQUE KEY uq_clients_phone (phone),
  UNIQUE KEY uq_clients_email (email),
  CONSTRAINT chk_clients_cupo CHECK (cupo >= 0)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  document VARCHAR(30) NULL UNIQUE,
  phone VARCHAR(15) NULL,
  email VARCHAR(190) NULL,
  address VARCHAR(200) NULL,
  city VARCHAR(50) NULL,
  status ENUM('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE products ADD COLUMN code VARCHAR(30) NULL AFTER id;
ALTER TABLE products ADD COLUMN brand VARCHAR(50) NULL AFTER description;
ALTER TABLE products ADD COLUMN size VARCHAR(30) NULL AFTER brand;
ALTER TABLE products ADD COLUMN unit ENUM('unidad','litro','galon','caja','paquete','metro','kg','ml','l','gal','m') NOT NULL DEFAULT 'unidad' AFTER size;
ALTER TABLE products ADD COLUMN quantity DECIMAL(12,2) NOT NULL DEFAULT 1 AFTER unit;
ALTER TABLE products ADD COLUMN estado ENUM('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO' AFTER price;
ALTER TABLE products ADD COLUMN expiration_date DATE NULL AFTER estado;
ALTER TABLE products ADD COLUMN price_purchase DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER expiration_date;
ALTER TABLE products ADD COLUMN price_wholesale DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER price_purchase;
ALTER TABLE products ADD COLUMN price_retail DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER price_wholesale;
ALTER TABLE products ADD COLUMN margin_wholesale DECIMAL(5,2) NOT NULL DEFAULT 20 AFTER price_retail;
ALTER TABLE products ADD COLUMN margin_retail DECIMAL(5,2) NOT NULL DEFAULT 25 AFTER margin_wholesale;
ALTER TABLE products ADD UNIQUE KEY uq_products_code (code);
ALTER TABLE products ADD UNIQUE KEY uq_products_name (name);
ALTER TABLE products MODIFY COLUMN code VARCHAR(30) NOT NULL;
ALTER TABLE products MODIFY COLUMN brand VARCHAR(50) NOT NULL;
ALTER TABLE products MODIFY COLUMN quantity DECIMAL(12,2) NOT NULL DEFAULT 1;
ALTER TABLE products ADD CONSTRAINT chk_products_quantity CHECK (quantity >= 1);
ALTER TABLE products ADD CONSTRAINT chk_products_margins CHECK (margin_wholesale BETWEEN 0 AND 100 AND margin_retail BETWEEN 0 AND 100);

ALTER TABLE purchases ADD COLUMN code VARCHAR(30) NULL AFTER id;
ALTER TABLE purchases ADD COLUMN total_value DECIMAL(12,2) NULL AFTER supplier;
ALTER TABLE purchases ADD COLUMN observations VARCHAR(300) NULL AFTER total;
ALTER TABLE purchases ADD COLUMN user_id INT UNSIGNED NULL AFTER notes;
ALTER TABLE purchases ADD COLUMN supplier_id INT UNSIGNED NULL AFTER user_id;
ALTER TABLE purchases MODIFY COLUMN supplier VARCHAR(150) NULL;
ALTER TABLE purchases ADD UNIQUE KEY uq_purchases_code (code);
ALTER TABLE purchases ADD CONSTRAINT fk_purchases_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE purchases ADD CONSTRAINT fk_purchases_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE RESTRICT;

ALTER TABLE sales ADD COLUMN code VARCHAR(30) NULL AFTER id;
ALTER TABLE sales ADD COLUMN total_value DECIMAL(12,2) NULL AFTER total;
ALTER TABLE sales ADD COLUMN pass DECIMAL(12,2) NULL AFTER total_value;
ALTER TABLE sales ADD COLUMN outstanding_balance DECIMAL(12,2) NULL AFTER pass;
ALTER TABLE sales ADD COLUMN client_id INT UNSIGNED NULL AFTER notes;
ALTER TABLE sales ADD COLUMN user_id INT UNSIGNED NULL AFTER client_id;
ALTER TABLE sales ADD COLUMN payment_type ENUM('contado','credito','mixto') NULL AFTER user_id;
ALTER TABLE sales ADD COLUMN monto_contado DECIMAL(12,2) NULL AFTER payment_type;
ALTER TABLE sales ADD COLUMN monto_credito DECIMAL(12,2) NULL AFTER monto_contado;
ALTER TABLE sales ADD COLUMN pago_con_credito BOOLEAN NOT NULL DEFAULT FALSE AFTER monto_credito;
ALTER TABLE sales ADD COLUMN estado ENUM('activa','devolucion','cancelada') NOT NULL DEFAULT 'activa' AFTER pago_con_credito;
ALTER TABLE sales MODIFY COLUMN reference VARCHAR(60) NULL;
ALTER TABLE sales ADD UNIQUE KEY uq_sales_code (code);
ALTER TABLE sales ADD CONSTRAINT fk_sales_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE RESTRICT;
ALTER TABLE sales ADD CONSTRAINT fk_sales_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE purchase_items ADD COLUMN sale_price DECIMAL(12,2) NOT NULL DEFAULT 0 AFTER unit_cost;
ALTER TABLE purchase_items ADD COLUMN total_price DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED AFTER sale_price;
ALTER TABLE sale_items ADD COLUMN total_price DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED AFTER unit_price;

CREATE TABLE IF NOT EXISTS devolutions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(30) NOT NULL UNIQUE,
  sale_id INT UNSIGNED NOT NULL,
  motivo VARCHAR(500) NOT NULL,
  total_devolucion DECIMAL(12,2) NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_devolutions_sale FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE RESTRICT,
  CONSTRAINT fk_devolutions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
  CONSTRAINT chk_devolutions_total CHECK (total_devolucion >= 0)
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
  CONSTRAINT fk_devolution_details_devolution FOREIGN KEY (devolution_id) REFERENCES devolutions(id) ON DELETE CASCADE,
  CONSTRAINT fk_devolution_details_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  CONSTRAINT fk_devolution_details_replacement FOREIGN KEY (producto_reemplazo_id) REFERENCES products(id) ON DELETE SET NULL,
  CONSTRAINT chk_devolution_details_quantity CHECK (cantidad_devuelta > 0),
  CONSTRAINT chk_devolution_details_values CHECK (precio_unitario >= 0 AND subtotal >= 0)
);

CREATE INDEX idx_sales_client ON sales(client_id);
CREATE INDEX idx_purchases_supplier ON purchases(supplier_id);
CREATE INDEX idx_devolutions_sale ON devolutions(sale_id);
