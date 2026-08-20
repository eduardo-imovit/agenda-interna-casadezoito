import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const SELECT = 'id, sala_id, usuario_id, empresa_id, titulo, responsavel, convidados, inicio, fim, status, cancelado_em, created_at, salas ( nome, cor, andar, capacidade ), perfis!reservas_usuario_id_fkey ( nome, email ), empresas ( nome )'

/** Reservas dentro de um intervalo [inicioISO, fimISO), opcionalmente filtradas por usuário. */
export function useReservas({ inicioISO, fimISO, usuarioId, somenteConfirmadas = false } = {}) {
  const [reservas, setReservas] = useState([])
  const [carregando, setCarregando] = useState(true)

  const recarregar = useCallback(async () => {
    if (!inicioISO || !fimISO) return
    setCarregando(true)
    let query = supabase
      .from('reservas')
      .select(SELECT)
      .lt('inicio', fimISO)
      .gt('fim', inicioISO)
      .order('inicio')
    if (usuarioId) query = query.eq('usuario_id', usuarioId)
    if (somenteConfirmadas) query = query.eq('status', 'confirmada')
    const { data, error } = await query
    if (!error) setReservas(data ?? [])
    setCarregando(false)
  }, [inicioISO, fimISO, usuarioId, somenteConfirmadas])

  useEffect(() => { recarregar() }, [recarregar])

  async function criarReserva({ salaId, usuarioId: dono, empresaId, titulo, responsavel, convidados, inicio, fim }) {
    const { error } = await supabase.from('reservas').insert({
      sala_id: salaId,
      usuario_id: dono,
      empresa_id: empresaId,
      titulo,
      responsavel,
      convidados,
      inicio,
      fim,
    })
    if (error) throw error
    await recarregar()
  }

  /** Edita horário/sala/título — cobre tanto "editar" quanto "transferir" (mudar sala/horário). */
  async function atualizarReserva(id, dados) {
    const { error } = await supabase.from('reservas').update(dados).eq('id', id)
    if (error) throw error
    await recarregar()
  }

  async function cancelarReserva(id) {
    const { error } = await supabase.from('reservas').update({ status: 'cancelada' }).eq('id', id)
    if (error) throw error
    await recarregar()
  }

  return { reservas, carregando, criarReserva, atualizarReserva, cancelarReserva, recarregar }
}
