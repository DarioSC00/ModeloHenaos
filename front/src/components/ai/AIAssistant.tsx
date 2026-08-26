import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Offcanvas, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

export function AIAssistant({ show, onClose }: { show: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '¡Hola! Soy HenaoBot, la inteligencia artificial de tu tienda. Puedo ayudarte con dudas sobre tus productos o ventas. ¿Qué necesitas?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }])
    setInput('')
    setLoading(true)

    try {
      const token = localStorage.getItem('henaos_token')
      const res = await fetch('http://localhost:3000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage })
      })
      const data = await res.json()
      if (data.ok) {
        setMessages((prev) => [...prev, { role: 'ai', text: data.reply }])
      } else {
        toast.error(data.msg)
      }
    } catch (err) {
      toast.error('Error al conectar con la IA')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" style={{ width: '450px' }}>
      <Offcanvas.Header closeButton>
        <div>
          <span className="eyebrow">ASISTENTE INTELIGENTE</span>
          <Offcanvas.Title>HenaoBot 🤖</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'hsl(var(--accent-primary))' : 'hsl(var(--bg-surface-hover))',
                padding: '16px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px',
                maxWidth: '85%',
                color: msg.role === 'user' ? '#fff' : 'inherit',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', background: 'hsl(var(--bg-surface-hover))', padding: '16px', borderRadius: '16px', borderBottomLeftRadius: '4px', fontSize: '14px' }}>
              <Icon icon="solar:moon-sleep-linear" className="spin-icon" /> Pensando...
            </div>
          )}
        </div>
        <Form onSubmit={send} style={{ display: 'flex', gap: '8px' }}>
          <Form.Control
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntame algo..."
            style={{
              background: 'hsl(var(--bg-base))',
              color: 'hsl(var(--text-main))',
              border: '1px solid hsl(var(--border-color))',
              padding: '16px',
              borderRadius: 'var(--radius-md)'
            }}
          />
          <Button
            type="submit"
            style={{
              background: 'hsl(var(--accent-primary))',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              width: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}
          >
            <Icon icon="solar:plain-2-linear" />
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
