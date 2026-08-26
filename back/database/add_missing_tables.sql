USE los_henaos;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('superadmin', 'admin') NOT NULL DEFAULT 'admin',
  status BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  message VARCHAR(500) NOT NULL,
  type ENUM('info', 'success', 'warning', 'error') NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS notification_details (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  notification_id INT UNSIGNED NOT NULL,
  entity_type ENUM('product', 'category', 'purchase', 'sale', 'dashboard') NOT NULL,
  entity_id INT UNSIGNED NULL,
  detail_key VARCHAR(80) NOT NULL,
  detail_value VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notification_details_notification FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dashboard_details (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  metric_key VARCHAR(80) NOT NULL,
  metric_label VARCHAR(150) NOT NULL,
  metric_value DECIMAL(14,2) NOT NULL DEFAULT 0,
  metric_type ENUM('number', 'currency', 'percentage') NOT NULL DEFAULT 'number',
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_dashboard_metric_period (metric_key, period_start, period_end)
);

