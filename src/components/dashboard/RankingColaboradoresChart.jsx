import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function RankingColaboradoresChart({ dados }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(200, dados.length * 32)}>
      <BarChart data={dados} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--ink-soft)' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis dataKey="nome" type="category" tick={{ fontSize: 11, fill: 'var(--ink-soft)' }} axisLine={false} tickLine={false} width={120} />
        <Tooltip
          formatter={(v) => [v, 'Reservas confirmadas']}
          contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }}
        />
        <Bar dataKey="total" fill="var(--primary)" radius={[0, 4, 4, 0]} maxBarSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
