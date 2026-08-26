import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@heroui/react'
import { toast } from 'react-toastify'
import { login, type SessionUser } from './auth.service'

type Props = { onLogin: (token: string, user: SessionUser) => void }
export function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setLoading(true); try { const session = await login(email, password); onLogin(session.token, session.user); toast.success('Bienvenido a LOS HENAOS') } catch (error) { toast.error(error instanceof Error ? error.message : 'No se pudo iniciar sesión') } finally { setLoading(false) } }
  return <main className="login-shell"><div className="login-decoration"><span className="login-orbit orbit-one" /><span className="login-orbit orbit-two" /><Icon icon="solar:layers-minimalistic-linear" /></div><section className="login-card"><div className="login-brand"><span><Icon icon="solar:layers-minimalistic-linear" /></span><div><b>LOS HENAOS</b><small>admin studio</small></div></div><span className="eyebrow">ACCESO ADMINISTRATIVO</span><h1>Tu operación,<br /><em>bajo control.</em></h1><p>Ingresa para administrar el catálogo y el movimiento de tu tienda.</p><form onSubmit={submit}><label>Correo electrónico<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@henaos.com" required autoComplete="email" /></label><label>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" required autoComplete="current-password" /></label><Button className="accent full" type="submit" isDisabled={loading}>{loading ? 'Verificando...' : 'Entrar al panel'} <Icon icon="solar:arrow-right-linear" /></Button></form><small className="login-security"><Icon icon="solar:shield-check-linear" /> Acceso protegido y cifrado</small></section></main>
}
