import { useMemo, useState } from 'react'
import { useReservas } from '../hooks/useReservas'
import { useSalas } from '../hooks/useSalas'
import { useEmpresas } from '../hooks/useEmpresas'
import KpiCard from '../components/dashboard/KpiCard'
import RankingSalasChart from '../components/dashboard/RankingSalasChart'
import SerieTempoChart from '../components/dashboard/SerieTempoChart'
import RankingColaboradoresChart from '../components/dashboard/RankingColaboradoresChart'
import HeatmapHorarios from '../components/dashboard/HeatmapHorarios'

const PERIODOS = [
  { valor: 7, label: 'Últimos 7 dias' },
  { valor: 30, label: 'Últimos 30 dias' },
  { valor: 90, label: 'Últimos 90 dias' },
]

export default function Dashboard() {
  const [periodoDias, setPeriodoDias] = useState(30)
  const [empresaFiltro, setEmpresaFiltro] = useState('')
  const [salaFiltro, setSalaFiltro] = useState('')

  const { salas } = useSalas({ somenteAtivas: false })
  const { empresas } = useEmpresas()

  const inicioISO = useMemo(() => new Date(Date.now() - periodoDias * 86400000).toISOString(), [periodoDias])
  const fimISO = useMemo(() => new Date().toISOString(), [])
  const { reservas, carregando } = useReservas({ inicioISO, fimISO })

  const reservasFiltradas = useMemo(
    () => reservas.filter((r) =>
      (!empresaFiltro || r.empresa_id === empresaFiltro) &&
      (!salaFiltro || r.sala_id === salaFiltro),
    ),
    [reservas, empresaFiltro, salaFiltro],
  )

  const kpis = useMemo(() => {
    const total = reservasFiltradas.length
    const canceladas = reservasFiltradas.filter((r) => r.status === 'cancelada').length
    const taxaCancelamento = total > 0 ? (canceladas / total) * 100 : 0

    const horasPorSala = {}
    for (const r of reservasFiltradas) {
      if (r.status !== 'confirmada') continue
      const horas = (new Date(r.fim) - new Date(r.inicio)) / 3600000
      horasPorSala[r.sala_id] = (horasPorSala[r.sala_id] ?? 0) + horas
    }
    const salaTopId = Object.entries(horasPorSala).sort((a, b) => b[1] - a[1])[0]?.[0]
    const salaTop = salas.find((s) => s.id === salaTopId)

    const contagemEmpresa = {}
    for (const r of reservasFiltradas) {
      if (r.status !== 'confirmada') continue
      contagemEmpresa[r.empresa_id] = (contagemEmpresa[r.empresa_id] ?? 0) + 1
    }
    const empresaTopId = Object.entries(contagemEmpresa).sort((a, b) => b[1] - a[1])[0]?.[0]
    const empresaTop = empresas.find((e) => e.id === empresaTopId)

    return { total, taxaCancelamento, salaTop, empresaTop }
  }, [reservasFiltradas, salas, empresas])

  const rankingSalas = useMemo(() => {
    const horas = {}
    for (const r of reservasFiltradas) {
      if (r.status !== 'confirmada') continue
      horas[r.sala_id] = (horas[r.sala_id] ?? 0) + (new Date(r.fim) - new Date(r.inicio)) / 3600000
    }
    return salas
      .map((s) => ({ nome: s.nome, cor: s.cor, horas: horas[s.id] ?? 0 }))
      .sort((a, b) => b.horas - a.horas)
  }, [reservasFiltradas, salas])

  const serieTempo = useMemo(() => {
    const porDia = {}
    for (const r of reservasFiltradas) {
      const dia = r.inicio.slice(0, 10)
      if (!porDia[dia]) porDia[dia] = { confirmadas: 0, canceladas: 0 }
      if (r.status === 'confirmada') porDia[dia].confirmadas += 1
      else porDia[dia].canceladas += 1
    }
    return Object.entries(porDia)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([dia, v]) => ({ rotulo: dia.slice(5).split('-').reverse().join('/'), ...v }))
  }, [reservasFiltradas])

  const rankingColaboradores = useMemo(() => {
    const porUsuario = {}
    for (const r of reservasFiltradas) {
      if (r.status !== 'confirmada') continue
      const nome = r.perfis?.nome ?? r.perfis?.email ?? 'Desconhecido'
      porUsuario[nome] = (porUsuario[nome] ?? 0) + 1
    }
    return Object.entries(porUsuario)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
  }, [reservasFiltradas])

  const heatmap = useMemo(() => {
    const matriz = [{}, {}, {}, {}, {}]
    let max = 0
    for (const r of reservasFiltradas) {
      if (r.status !== 'confirmada') continue
      const d = new Date(r.inicio)
      const diaSemana = d.getDay() // 0=dom..6=sab
      if (diaSemana === 0 || diaSemana === 6) continue
      const idx = diaSemana - 1
      const hora = d.getHours()
      matriz[idx][hora] = (matriz[idx][hora] ?? 0) + 1
      max = Math.max(max, matriz[idx][hora])
    }
    return { matriz, max }
  }, [reservasFiltradas])

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Administração</div>
          <div className="page-title">Dashboard de uso das salas</div>
        </div>
      </div>

      <div className="filters-bar">
        <select value={periodoDias} onChange={(e) => setPeriodoDias(Number(e.target.value))}>
          {PERIODOS.map((p) => <option key={p.valor} value={p.valor}>{p.label}</option>)}
        </select>
        <select value={empresaFiltro} onChange={(e) => setEmpresaFiltro(e.target.value)}>
          <option value="">Empresa: todas</option>
          {empresas.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
        </select>
        <select value={salaFiltro} onChange={(e) => setSalaFiltro(e.target.value)}>
          <option value="">Sala: todas</option>
          {salas.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}
        </select>
      </div>

      {carregando ? (
        <div className="hub-loading">Carregando…</div>
      ) : (
        <>
          <div className="kpi-grid">
            <KpiCard label="Reservas no período" valor={kpis.total} />
            <KpiCard label="Taxa de cancelamento" valor={`${kpis.taxaCancelamento.toFixed(0)}%`} />
            <KpiCard label="Sala mais usada" valor={kpis.salaTop?.nome ?? '—'} />
            <KpiCard label="Empresa mais ativa" valor={kpis.empresaTop?.nome ?? '—'} />
          </div>

          <div className="dash-section">
            <div className="dash-section-header">
              <div>
                <div className="dash-section-title">Horas reservadas por sala</div>
              </div>
            </div>
            <RankingSalasChart dados={rankingSalas} />
          </div>

          <div className="dash-section">
            <div className="dash-section-header">
              <div>
                <div className="dash-section-title">Reservas confirmadas × canceladas</div>
              </div>
            </div>
            <SerieTempoChart dados={serieTempo} />
          </div>

          <div className="dash-section">
            <div className="dash-section-header">
              <div>
                <div className="dash-section-title">Top 10 colaboradores</div>
              </div>
            </div>
            <RankingColaboradoresChart dados={rankingColaboradores} />
          </div>

          <div className="dash-section">
            <div className="dash-section-header">
              <div>
                <div className="dash-section-title">Horário de pico</div>
                <div className="dash-section-sub">Reservas confirmadas por dia da semana e hora de início</div>
              </div>
            </div>
            <HeatmapHorarios matriz={heatmap.matriz} max={heatmap.max} />
          </div>
        </>
      )}
    </div>
  )
}
