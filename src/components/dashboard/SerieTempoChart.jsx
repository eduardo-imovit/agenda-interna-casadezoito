import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function SerieTempoChart({ dados }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={dados} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
        <XAxis dataKey="rotulo" tick={{ fontSize: 11, fill: 'var(--ink-soft)' }} axisLine={{ stroke: 'var(--line)' }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--ink-soft)' }} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
        <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="confirmadas" name="Confirmadas" stroke="var(--success)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="canceladas" name="Canceladas" stroke="var(--danger)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
