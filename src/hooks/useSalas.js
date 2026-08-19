import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSalas({ somenteAtivas = true } = {}) {
  const [salas, setSalas] = useState([])
  const [carregando, setCarregando] = useState(true)

  const recarregar = useCallback(async () => {
    setCarregando(true)
    let query = supabase.from('salas').select('*').order('nome')
    if (somenteAtivas) query = query.eq('ativa', true)
    const { data, error } = await query
    if (!error) setSalas(data ?? [])
    setCarregando(false)
  }, [somenteAtivas])

  useEffect(() => { recarregar() }, [recarregar])

  async function criarSala(dados) {
    const { error } = await supabase.from('salas').insert(dados)
    if (error) throw error
    await recarregar()
  }

  async function atualizarSala(id, dados) {
    const { error } = await supabase.from('salas').update(dados).eq('id', id)
    if (error) throw error
    await recarregar()
  }

  /** Apaga a sala. Falha com erro 23503 (violação de FK) se já existem reservas nela. */
  async function excluirSala(id) {
    const { error } = await supabase.from('salas').delete().eq('id', id)
    if (error) throw error
    await recarregar()
  }

  return { salas, carregando, criarSala, atualizarSala, excluirSala, recarregar }
}
