// Google redireciona pra cá depois do usuário autorizar. Troca o code pelos
// tokens, valida o `state` assinado (garante que foi o próprio usuário logado
// que iniciou o fluxo) e grava o refresh_token em google_tokens.
import { createClient } from 'jsr:@supabase/supabase-js@2'

function base64urlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + (4 - (str.length % 4 || 4)) % 4, '=')
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))
}

async function validarState(state: string, secret: string): Promise<string | null> {
  const [payloadB64, assinaturaB64] = state.split('.')
  if (!payloadB64 || !assinaturaB64) return null
  const payload = new TextDecoder().decode(base64urlDecode(payloadB64))
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
  const valido = await crypto.subtle.verify('HMAC', key, base64urlDecode(assinaturaB64), new TextEncoder().encode(payload))
  if (!valido) return null
  const [usuarioId, expiraStr] = payload.split('.')
  if (Number(expiraStr) < Math.floor(Date.now() / 1000)) return null
  return usuarioId
}

async function trocarCodePorTokens(code: string, redirectUri: string) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
      client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  if (!res.ok) throw new Error(`Falha ao trocar code por tokens: ${await res.text()}`)
  return res.json() as Promise<{ access_token: string; refresh_token?: string; expires_in: number }>
}

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const siteUrl = Deno.env.get('SITE_URL')!

  if (!code || !state) {
    return Response.redirect(`${siteUrl}/perfil?google=erro`, 302)
  }

  const usuarioId = await validarState(state, Deno.env.get('GOOGLE_STATE_SECRET')!)
  if (!usuarioId) {
    return Response.redirect(`${siteUrl}/perfil?google=erro`, 302)
  }

  const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/google-oauth-callback`

  try {
    const tokens = await trocarCodePorTokens(code, redirectUri)
    if (!tokens.refresh_token) {
      // Google só devolve refresh_token no primeiro consentimento; se o usuário
      // já tinha autorizado antes sem revogar, pedimos consentimento de novo.
      return Response.redirect(`${siteUrl}/perfil?google=reconectar`, 302)
    }

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    await admin.from('google_tokens').upsert({
      usuario_id: usuarioId,
      refresh_token: tokens.refresh_token,
      access_token_cache: tokens.access_token,
      expiry: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    })
    await admin.from('perfis').update({ google_connected: true }).eq('id', usuarioId)

    return Response.redirect(`${siteUrl}/perfil?google=conectado`, 302)
  } catch (err) {
    console.error(err)
    return Response.redirect(`${siteUrl}/perfil?google=erro`, 302)
  }
})
