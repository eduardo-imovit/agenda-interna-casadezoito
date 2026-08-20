import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSalas } from '../hooks/useSalas'
import { useReservas } from '../hooks/useReservas'
import { usePerfil } from '../hooks/usePerfil'
import { useSession } from '../hooks/useSession'
import { diaAnterior, diaSeguinte, formatarDataLonga, hojeISO } from '../lib/dateUtils'
import AgendaDia from '../components/agenda/AgendaDia'
import FormularioReserva from '../components/agenda/FormularioReserva'

export default function Agenda() {
  const [dataFoco, setDataFoco] = useState(hojeISO())
  const [formulario, setFormulario] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const { salas, carregando: carregandoSalas } = useSalas()
  const { session } = useSession()
  const { perfil } = usePerfil()

  const inicioISO = `${dataFoco}T00:00:00`
  const fimISO = `${dataFoco}T23:59:59`
  const { reservas, carregando: carregandoReservas, criarReserva, atualizarReserva, cancelarReserva } = useReservas({ inicioISO, fimISO, somenteConfirmadas: true })

  const titulo = useMemo(() => formatarDataLonga(new Date(`${dataFoco}T12:00:00`)), [dataFoco])

  function abrirNovaReserva(salaIdPreferida) {
    const inicio = new Date(`${dataFoco}T09:00:00`)
    const fim = new Date(inicio.getTime() + 60 * 60 * 1000)
    setFormulario({ sala_id: salaIdPreferida ?? salas[0]?.id ?? '', inicio, fim, titulo: '' })
  }

  // Vindo do mapa da Home (clique numa sala) — abre direto o formulário com a sala escolhida.
  useEffect(() => {
    if (carregandoSalas || searchParams.get('nova') !== '1') return
    abrirNovaReserva(searchParams.get('sala'))
    setSearchParams({}, { replace: true })
  }, [carregandoSalas])

  function abrirEdicao(reserva) {
    setFormulario(reserva)
  }

  async function salvar(dados) {
    if (formulario.id) {
      await atualizarReserva(formulario.id, dados)
    } else {
      await criarReserva({
        salaId: dados.sala_id,
        usuarioId: session.user.id,
        titulo: dados.titulo,
        responsavel: dados.responsavel,
        convidados: dados.convidados,
        inicio: dados.inicio,
        fim: dados.fim,
      })
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Agenda</div>
          <div className="page-title">Agenda das salas</div>
          <div className="page-sub">Cada cor é uma sala. Clique num evento pra ver ou editar.</div>
        </div>
        {salas.length > 0 && (
          <button type="button" className="btn btn-primary btn-sm" onClick={() => abrirNovaReserva()}>+ Nova reserva</button>
        )}
      </div>

      <div className="grade-shell">
        <div className="grade-nav">
          <div className="grade-nav-left">
            <div className="grade-nav-arrows">
              <button type="button" className="btn-icon btn-icon-sm" onClick={() => setDataFoco(diaAnterior(dataFoco))}>‹</button>
              <button type="button" className="btn-icon btn-icon-sm" onClick={() => setDataFoco(diaSeguinte(dataFoco))}>›</button>
            </div>
            <span className="grade-nav-title">{titulo}</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDataFoco(hojeISO())}>Hoje</button>
          </div>
        </div>

        {carregandoSalas || carregandoReservas ? (
          <div className="hub-loading">Carregando…</div>
        ) : salas.length === 0 ? (
          <div className="empty">
            <div className="empty-title">Nenhuma sala cadastrada</div>
            <div className="empty-sub">Peça a um admin pra cadastrar as salas do prédio.</div>
          </div>
        ) : (
          <AgendaDia reservas={reservas} onEventoClick={abrirEdicao} />
        )}
      </div>

      {formulario && (
        <FormularioReserva
          salas={salas}
          valoresIniciais={formulario}
          nomeUsuario={perfil?.nome}
          souDono={!formulario.id || formulario.usuario_id === session?.user?.id}
          ehAdmin={perfil?.role === 'admin'}
          onSalvar={salvar}
          onCancelarReserva={() => cancelarReserva(formulario.id)}
          onFechar={() => setFormulario(null)}
        />
      )}
    </div>
  )
}
