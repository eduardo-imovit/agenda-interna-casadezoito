import { useMemo } from 'react'
import { formatarHora } from '../../lib/dateUtils'

const HORA_INICIO = 7
const HORA_FIM = 20
const ALTURA_HORA = 44 // px

function minutosDesde(dataISO, horaBase) {
  const d = new Date(dataISO)
  return (d.getHours() - horaBase) * 60 + d.getMinutes()
}

/** Agrupa reservas que se sobrepõem no tempo e distribui em colunas lado a lado (packing guloso). */
function calcularLayout(reservas) {
  const eventos = [...reservas]
    .sort((a, b) => a.inicio.localeCompare(b.inicio))
    .map((r) => ({
      reserva: r,
      inicioMin: Math.max(0, minutosDesde(r.inicio, HORA_INICIO)),
      fimMin: minutosDesde(r.fim, HORA_INICIO),
    }))

  const resultado = []
  let cluster = []
  let clusterFimMax = -Infinity

  function fecharCluster() {
    if (cluster.length === 0) return
    const colunas = []
    for (const ev of cluster) {
      let colIdx = colunas.findIndex((fim) => fim <= ev.inicioMin)
      if (colIdx === -1) { colIdx = colunas.length; colunas.push(ev.fimMin) }
      else colunas[colIdx] = ev.fimMin
      ev.colIdx = colIdx
    }
    const totalColunas = colunas.length
    cluster.forEach((ev) => resultado.push({ ...ev, totalColunas }))
    cluster = []
    clusterFimMax = -Infinity
  }

  for (const ev of eventos) {
    if (cluster.length > 0 && ev.inicioMin >= clusterFimMax) fecharCluster()
    cluster.push(ev)
    clusterFimMax = Math.max(clusterFimMax, ev.fimMin)
  }
  fecharCluster()

  return resultado
}

export default function AgendaDia({ reservas, salaFiltro, onEventoClick }) {
  const horas = useMemo(() => {
    const lista = []
    for (let h = HORA_INICIO; h < HORA_FIM; h++) lista.push(h)
    return lista
  }, [])

  const alturaTotal = (HORA_FIM - HORA_INICIO) * ALTURA_HORA
  const layout = useMemo(() => calcularLayout(reservas), [reservas])

  if (reservas.length === 0) {
    return (
      <div className="empty">
        <div className="empty-title">Nenhuma reserva {salaFiltro ? `na ${salaFiltro}` : 'nesse dia'}</div>
        <div className="empty-sub">
          {salaFiltro ? `A sala "${salaFiltro}" está livre nesse dia.` : 'O prédio está livre.'} Clique em "+ Nova reserva" pra marcar um horário.
        </div>
      </div>
    )
  }

  return (
    <div className="dia-shell">
      <div className="dia-gutter">
        {horas.map((h) => (
          <div key={h} className="dia-gutter-hora" style={{ top: (h - HORA_INICIO) * ALTURA_HORA }}>
            {String(h).padStart(2, '0')}:00
          </div>
        ))}
      </div>

      <div className="dia-corpo" style={{ height: alturaTotal, '--dia-hora-altura': `${ALTURA_HORA}px` }}>
        {layout.map(({ reserva: r, inicioMin, fimMin, colIdx, totalColunas }) => {
          const top = inicioMin * (ALTURA_HORA / 60)
          const altura = Math.max(22, (fimMin - inicioMin) * (ALTURA_HORA / 60))
          const largura = 100 / totalColunas
          return (
            <div
              key={r.id}
              className="dia-evento"
              style={{
                top,
                height: altura,
                left: `calc(${colIdx * largura}% + 2px)`,
                width: `calc(${largura}% - 4px)`,
                '--evento-cor': r.salas?.cor,
              }}
              onClick={() => onEventoClick?.(r)}
            >
              <div className="dia-evento-titulo">{r.titulo}</div>
              <div className="dia-evento-sub">{formatarHora(r.inicio)}–{formatarHora(r.fim)} · {r.salas?.nome}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
