// Chamada pelo client (com o access token do usuário logado) quando ele clica
// em "Conectar Google Calendar" no Perfil. Devolve a URL de autorização do
// Google já com um `state` assinado, pra o client redirecionar o navegador.
import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

function base64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function assinarState(usuarioId: string, secret: string, ttlSegundos = 600): Promise<string> {
  const expira = Math.floor(Date.now() / 1000) + ttlSegundos
  const payload = `${usuarioId}.${expira}`
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const assinatura = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)))
  return `${base64url(new TextEncoder().encode(payload))}.${base64url(assinatura)}`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Não autenticado', { status: 401, headers: CORS })

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData.user) return new Response('Não autenticado', { status: 401, headers: CORS })

  const state = await assinarState(userData.user.id, Deno.env.get('GOOGLE_STATE_SECRET')!)
  const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/google-oauth-callback`

  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.searchParams.set('client_id', Deno.env.get('GOOGLE_CLIENT_ID')!)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar.events')
  url.searchParams.set('access_type', 'offline')
  url.searchParams.set('prompt', 'consent')
  url.searchParams.set('state', state)

  return new Response(JSON.stringify({ url: url.toString() }), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})
