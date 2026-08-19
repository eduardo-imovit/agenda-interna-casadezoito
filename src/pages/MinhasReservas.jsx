import { useMemo, useState } from 'react'
import { useSession } from '../hooks/useSession'
import { usePerfil } from '../hooks/usePerfil'
import { useSalas } from '../hooks/useSalas'
import { useReservas } from '../hooks/useReservas'
import { formatarHora } from '../lib/dateUtils'
import FormularioReserva from '../components/agenda/FormularioReserva'

export default function MinhasReservas() {
  const { session } = useSession()
  const { perfil } = usePerfil()
  const { salas } = useSalas()
  const [formulario, setFormulario] = useState(null)

  const { inicioISO, fimISO } = useMemo(() => ({
    inicioISO: new Date(Date.now() - 30 * 86400000).toISOString(),
    fimISO: new Date(Date.now() + 365 * 86400000).toISOString(),
  }), [])
  const { reservas, carregando, atualizarReserva, cancelarReserva } = useReservas({ inicioISO, fimISO, usuarioId: session?.user?.id })

  const reservasOrdenadas = [...reservas].sort((a, b) => b.inicio.localeCompare(a.inicio))

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Minhas reservas</div>
          <div className="page-title">Histórico de reservas</div>
        </div>
      </div>

      {carregando ? (
        <div className="hub-loading">Carregando…</div>
      ) : reservasOrdenadas.length === 0 ? (
        <div className="empty">
          <div className="empty-title">Você ainda não fez nenhuma reserva</div>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Sala</th>
              <th>Título</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservasOrdenadas.map((r) => (
              <tr key={r.id}>
                <td>{r.salas?.nome}</td>
                <td>{r.titulo}</td>
                <td className="num">{new Date(r.inicio).toLocaleDateString('pt-BR')} {formatarHora(r.inicio)}</td>
                <td className="num">{formatarHora(r.fim)}</td>
                <td>
                  <span className={`badge ${r.status === 'confirmada' ? 'badge-success' : 'badge-danger'}`}>
                    {r.status === 'confirmada' ? 'Confirmada' : 'Cancelada'}
                  </span>
                </td>
                <td>
                  {r.status === 'confirmada' && (
                    <button type="button" className="btn-link" onClick={() => setFormulario(r)}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {formulario && (
        <FormularioReserva
          salas={salas}
          valoresIniciais={formulario}
          souDono={formulario.usuario_id === session?.user?.id}
          ehAdmin={perfil?.role === 'admin'}
          onSalvar={(dados) => atualizarReserva(formulario.id, dados)}
          onCancelarReserva={() => cancelarReserva(formulario.id)}
          onFechar={() => setFormulario(null)}
        />
      )}
    </div>
  )
}
