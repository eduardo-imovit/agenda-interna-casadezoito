// Chamada pelo painel de Configurações > Usuários quando um admin exclui uma conta.
// Precisa de service role (supabase.auth.admin.deleteUser não existe no client anon).
import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Não autenticado', { status: 401, headers: CORS })

  const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: userData, error: authError } = await client.auth.getUser()
  if (authError || !userData.user) return new Response('Não autenticado', { status: 401, headers: CORS })

  const { data: perfilChamador } = await admin.from('perfis').select('role').eq('id', userData.user.id).single()
  if (perfilChamador?.role !== 'admin') return new Response('Somente admin pode excluir usuários', { status: 403, headers: CORS })

  const { usuarioId } = await req.json()
  if (!usuarioId) return new Response('usuarioId é obrigatório', { status: 400, headers: CORS })
  if (usuarioId === userData.user.id) return new Response('Não é possível excluir a própria conta', { status: 400, headers: CORS })

  try {
    // reservas.usuario_id não tem cascade — precisa limpar antes de apagar o perfil/usuário.
    await admin.from('reservas').delete().eq('usuario_id', usuarioId)
    const { error } = await admin.auth.admin.deleteUser(usuarioId)
    if (error) throw error
    return new Response(JSON.stringify({ ok: true }), { headers: { ...CORS, 'Content-Type': 'application/json' } })
  } catch (err) {
    return new Response(String(err), { status: 500, headers: CORS })
  }
})
