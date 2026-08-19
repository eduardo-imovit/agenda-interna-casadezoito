import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { useReservas } from '../hooks/useReservas'
import { useSalas } from '../hooks/useSalas'
import { usePerfil } from '../hooks/usePerfil'
import MapaPlantas from '../components/config/MapaPlantas'
import { formatarHora, hojeISO } from '../lib/dateUtils'

export default function Home() {
  const { session } = useSession()
  const { salas, carregando: carregandoSalas } = useSalas()
  const { perfil } = usePerfil()
  const ehAdmin = perfil?.role === 'admin'
  const { inicioISO, fimISO } = useMemo(() => ({
    inicioISO: `${hojeISO()}T00:00:00`,
    fimISO: new Date(Date.now() + 7 * 86400000).toISOString(),
  }), [])
  const { reservas, carregando } = useReservas({ inicioISO, fimISO, usuarioId: session?.user?.id, somenteConfirmadas: true })

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Prédio</div>
          <div className="page-title">Salas</div>
        </div>
        <Link to="/agenda" className="btn btn-secondary btn-sm">Ver agenda</Link>
      </div>

      {carregandoSalas ? (
        <div className="hub-loading">Carregando…</div>
      ) : salas.length === 0 ? (
        <div className="empty">
          <div className="empty-title">Nenhuma sala cadastrada</div>
          <div className="empty-sub">Peça a um admin pra cadastrar as salas do prédio.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          {salas.map((sala) => (
            <div key={sala.id} className="card">
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', borderLeft: `3px solid ${sala.cor}` }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>{sala.nome}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)' }}>
                  {sala.andar ? `${sala.andar} · ` : ''}{sala.capacidade ? `${sala.capacidade} lugares` : 'Capacidade não informada'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="page-header" style={{ marginTop: 'var(--space-8)' }}>
        <div>
          <div className="page-eyebrow">Prédio</div>
          <div className="page-title">Mapa das salas</div>
        </div>
      </div>
      <MapaPlantas ehAdmin={ehAdmin} />

      <div className="page-header" style={{ marginTop: 'var(--space-8)' }}>
        <div>
          <div className="page-eyebrow">Home</div>
          <div className="page-title">Minhas próximas reservas</div>
        </div>
        <Link to="/agenda" className="btn btn-primary btn-sm">+ Nova reserva</Link>
      </div>

      {carregando ? (
        <div className="hub-loading">Carregando…</div>
      ) : reservas.length === 0 ? (
        <div className="empty">
          <div className="empty-title">Nenhuma reserva marcada</div>
          <div className="empty-sub">Vá até a agenda das salas pra marcar seu próximo horário.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {reservas.map((r) => (
            <div key={r.id} className="agenda-item">
              <span className="agenda-dot" style={{ background: r.salas?.cor }} />
              <div className="agenda-info">
                <div className="agenda-title">{r.titulo}</div>
                <div className="agenda-sub">{r.salas?.nome} · {formatarHora(r.inicio)}–{formatarHora(r.fim)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
