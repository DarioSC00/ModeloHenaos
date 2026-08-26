# LOS HENAOS API

Backend local para el sistema administrativo de LOS HENAOS. Está construido con Node.js, Express y MySQL.

## Configuración de MySQL Workbench

1. Abre MySQL Workbench y conéctate a tu instancia local de MySQL.
2. Abre el archivo `database/schema.sql`, ejecútalo completo con el botón del rayo y confirma que se cree la base `los_henaos`.
3. En esta carpeta, copia `.env.example` con el nombre `.env`.
4. Completa `.env` con los datos de la misma conexión que usaste en Workbench:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=los_henaos
DB_USER=root
DB_PASSWORD=tu_password_mysql
```

La cadena equivalente es `mysql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME`. La API la construye internamente desde esas cinco variables en `src/config/env.js`; no se escribe en los modelos ni en los controladores.

También puedes crear la estructura desde la terminal con `npm run db:init`, después de completar `.env`.

Para crear o actualizar el superadmin sin guardar sus credenciales en el proyecto:

```bash
npm run admin:create
```

El script solicitará nombre, correo y contraseña directamente en la terminal. La contraseña se guarda únicamente como hash bcrypt.

5. Instala dependencias y levanta la API:

```bash
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`.

## Modelos, controladores y rutas

Cada tabla principal tiene su propio modelo en `src/models`, su controlador en `src/controllers` y su ruta en `src/routes`:

- `categories`: `categoria_model.js`, `categoria_controller.js`, `categoria_routes.js`
- `products`: `producto_model.js`, `producto_controller.js`, `producto_routes.js`
- `purchases`: `compra_model.js`, `compra_controller.js`, `compra_routes.js`
- `sales`: `venta_model.js`, `venta_controller.js`, `venta_routes.js`

Los modelos usan el pool de `src/config/database.js` y consultas parametrizadas de `mysql2`. No se usa Mongoose porque esta aplicación trabaja con MySQL y MySQL Workbench.

## Endpoints

- `GET /api/health`
- `GET /api/dashboard/summary`
- CRUD `/api/categories`
- CRUD `/api/products`
- CRUD `/api/purchases`
- CRUD `/api/sales`
- `GET|POST /api/purchases/:id/items` para detalles de compra
- `GET|POST /api/sales/:id/items` para detalles de venta
- CRUD parcial `/api/notifications` y detalles en `/api/notifications/:id/details`
- `GET|POST /api/dashboard/details` para métricas históricas por periodo

Para una base ya creada, ejecuta `database/add_missing_tables.sql` en Workbench. Para una instalación nueva, `database/schema.sql` ya incluye todas las tablas.

Todos los recursos tienen `GET /`, `GET /:id`, `POST /`, `PUT /:id` y `DELETE /:id`.

Para crear o actualizar recursos se envía JSON. Ejemplos mínimos:

```json
// POST /api/categories
{ "name": "Bebidas", "description": "Productos para beber" }

// POST /api/products
{ "name": "Agua", "price": 10, "stock": 20, "category": 1, "description": "Agua purificada" }

// POST /api/purchases
{ "reference": "COMP-001", "supplier": "Proveedor local", "purchase_date": "2026-08-24", "total": 200 }

// POST /api/sales
{ "reference": "VENT-001", "sale_date": "2026-08-24", "total": 50 }
```

Para agregar un producto a una compra usa `POST /api/purchases/:id/items` con `{ "product_id": 1, "quantity": 5, "unit_cost": 8 }`. Para una venta usa `POST /api/sales/:id/items` con `{ "product_id": 1, "quantity": 2, "unit_price": 10 }`.

No hay datos semilla: la base comienza vacía para que los registros se creen desde el panel administrativo.
