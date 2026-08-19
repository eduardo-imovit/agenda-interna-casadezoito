// Chamada por um Database Webhook em `reservas` (INSERT/UPDATE/DELETE).
// Mantém o evento na agenda pessoal do dono da reserva em dia — se ele nunca
// conectou o Google, é um no-op silencioso.
import { createClient } from 'jsr:@supabase/supabase-js@2'

const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
const CALENDAR_EVENTS_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events'

type Reserva = {
  id: string
  usuario_id: string
  sala_id: string
  titulo: string
  inicio: string
  fim: string
  status: 'confirmada' | 'cancelada'
  google_event_id: string | null
}

type Payload = {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: Reserva | null
  old_record: Reserva | null
}

async function obterAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
      client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!,
      grant_type: 'refresh_token',
    }),
  })
  if (!res.ok) throw new Error(`Falha ao renovar access token: ${await res.text()}`)
  const data = await res.json()
  return data.access_token as string
}

async function accessTokenDoUsuario(usuarioId: string): Promise<string | null> {
  const { data } = await admin.from('google_tokens').select('refresh_token').eq('usuario_id', usuarioId).maybeSingle()
  if (!data) return null
  return obterAccessToken(data.refresh_token)
}

type EventoReserva = { titulo: string; inicio: string; fim: string }

async function criarEvento(accessToken: string, evento: EventoReserva): Promise<string> {
  const res = await fetch(CALENDAR_EVENTS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ summary: evento.titulo, start: { dateTime: evento.inicio }, end: { dateTime: evento.fim } }),
  })
  if (!res.ok) throw new Error(`Falha ao criar evento: ${await res.text()}`)
  const data = await res.json()
  return data.id as string
}

async function atualizarEvento(accessToken: string, eventId: string, evento: EventoReserva): Promise<void> {
  const res = await fetch(`${CALENDAR_EVENTS_URL}/${eventId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ summary: evento.titulo, start: { dateTime: evento.inicio }, end: { dateTime: evento.fim } }),
  })
  if (!res.ok && res.status !== 404) throw new Error(`Falha ao atualizar evento: ${await res.text()}`)
}

async function removerEvento(accessToken: string, eventId: string): Promise<void> {
  const res = await fetch(`${CALENDAR_EVENTS_URL}/${eventId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${accessToken}` } })
  if (!res.ok && res.status !== 404 && res.status !== 410) throw new Error(`Falha ao remover evento: ${await res.text()}`)
}

Deno.serve(async (req) => {
  // Chamada pelo Database Webhook (trigger em `reservas`), não por um usuário logado —
  // por isso verify_jwt fica desligado no deploy e a autenticação é este segredo compartilhado,
  // enviado pelo próprio trigger no header `x-webhook-secret`.
  if (req.headers.get('x-webhook-secret') !== Deno.env.get('WEBHOOK_SECRET')) {
    return new Response('não autorizado', { status: 401 })
  }

  const payload = (await req.json()) as Payload

  try {
    if (payload.type === 'INSERT' && payload.record) {
      const r = payload.record
      if (r.status !== 'confirmada') return new Response('ok')
      const accessToken = await accessTokenDoUsuario(r.usuario_id)
      if (!accessToken) return new Response('sem google conectado')
      const eventId = await criarEvento(accessToken, { titulo: r.titulo, inicio: r.inicio, fim: r.fim })
      await admin.from('reservas').update({ google_event_id: eventId }).eq('id', r.id)
      return new Response('criado')
    }

    if (payload.type === 'UPDATE' && payload.record && payload.old_record) {
      const r = payload.record
      const antes = payload.old_record
      const accessToken = await accessTokenDoUsuario(r.usuario_id)
      if (!accessToken) return new Response('sem google conectado')

      if (r.status === 'cancelada' && antes.status !== 'cancelada') {
        if (r.google_event_id) await removerEvento(accessToken, r.google_event_id)
        return new Response('cancelado')
      }

      if (r.status === 'confirmada') {
        if (!r.google_event_id) {
          const eventId = await criarEvento(accessToken, { titulo: r.titulo, inicio: r.inicio, fim: r.fim })
          await admin.from('reservas').update({ google_event_id: eventId }).eq('id', r.id)
          return new Response('criado')
        }
        const mudou = r.titulo !== antes.titulo || r.inicio !== antes.inicio || r.fim !== antes.fim || r.sala_id !== antes.sala_id
        if (mudou) {
          await atualizarEvento(accessToken, r.google_event_id, { titulo: r.titulo, inicio: r.inicio, fim: r.fim })
          return new Response('atualizado')
        }
      }
      return new Response('sem mudanca')
    }

    if (payload.type === 'DELETE' && payload.old_record) {
      const antes = payload.old_record
      if (antes.google_event_id) {
        const accessToken = await accessTokenDoUsuario(antes.usuario_id)
        if (accessToken) await removerEvento(accessToken, antes.google_event_id)
      }
      return new Response('removido')
    }

    return new Response('ignorado')
  } catch (err) {
    console.error(err)
    return new Response(String(err), { status: 500 })
  }
})
