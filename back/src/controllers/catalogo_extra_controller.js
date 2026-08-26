import * as Cliente from '../models/cliente_model.js'
import * as Proveedor from '../models/proveedor_model.js'
export async function getClients(req, res, next) { try { res.json({ ok: true, clients: await Cliente.findAll() }) } catch (error) { next(error) } }
export async function createClient(req, res, next) { try { const client = await Cliente.create(req.body); res.status(201).json({ ok: true, client }) } catch (error) { next(error) } }
export async function getSuppliers(req, res, next) { try { res.json({ ok: true, suppliers: await Proveedor.findAll() }) } catch (error) { next(error) } }
export async function createSupplier(req, res, next) { try { const supplier = await Proveedor.create(req.body); res.status(201).json({ ok: true, supplier }) } catch (error) { next(error) } }
