const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
const HORAS = Array.from({ length: 12 }, (_, i) => i + 8) // 08–19

/** matriz[dia][hora] = contagem de reservas confirmadas iniciadas naquele slot. */
export default function HeatmapHorarios({ matriz, max }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `40px repeat(${HORAS.length}, 1fr)`, gap: 3, minWidth: 560 }}>
        <div />
        {HORAS.map((h) => (
          <div key={h} style={{ fontSize: 10, color: 'var(--ink-faint)', textAlign: 'center' }}>{h}h</div>
        ))}
        {DIAS.map((dia, dIdx) => (
          <>
            <div key={`label-${dia}`} style={{ fontSize: 11, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center' }}>{dia}</div>
            {HORAS.map((h) => {
              const valor = matriz[dIdx]?.[h] ?? 0
              const intensidade = max > 0 ? valor / max : 0
              return (
                <div
                  key={`${dia}-${h}`}
                  title={`${dia} ${h}h — ${valor} reserva(s)`}
                  style={{
                    height: 22,
                    borderRadius: 3,
                    background: intensidade === 0 ? 'var(--bg-subtle)' : `color-mix(in oklch, var(--primary) ${Math.round(20 + intensidade * 80)}%, white)`,
                  }}
                />
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
