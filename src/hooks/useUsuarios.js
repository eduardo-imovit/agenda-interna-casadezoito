import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

/** Lista de usuários (perfis) pro painel de Configurações > Usuários, só pra admin. */
export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)

  const recarregar = useCallback(async () => {
    setCarregando(true)
    const { data, error } = await supabase
      .from('perfis')
      .select('id, nome, email, role, empresas ( nome )')
      .order('nome')
    if (!error) setUsuarios(data ?? [])
    setCarregando(false)
  }, [])

  useEffect(() => { recarregar() }, [recarregar])

  async function pedirResetSenha(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    })
    if (error) throw error
  }

  /** Exclui a conta por completo (auth + perfil + reservas) via Edge Function com service role. */
  async function excluirUsuario(usuarioId) {
    const { data, error } = await supabase.functions.invoke('admin-excluir-usuario', {
      body: { usuarioId },
    })
    if (error) throw error
    await recarregar()
    return data
  }

  async function alterarPapel(usuarioId, role) {
    const { error } = await supabase.from('perfis').update({ role }).eq('id', usuarioId)
    if (error) throw error
    await recarregar()
  }

  return { usuarios, carregando, pedirResetSenha, excluirUsuario, alterarPapel, recarregar }
}
