import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function RankingSalasChart({ dados }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={dados} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
        <XAxis dataKey="nome" tick={{ fontSize: 11, fill: 'var(--ink-soft)' }} axisLine={{ stroke: 'var(--line)' }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--ink-soft)' }} axisLine={false} tickLine={false} width={32} />
        <Tooltip
          formatter={(v) => [`${v.toFixed(1)} h`, 'Horas reservadas']}
          contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }}
        />
        <Bar dataKey="horas" radius={[4, 4, 0, 0]} maxBarSize={48}>
          {dados.map((d) => <Cell key={d.nome} fill={d.cor} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
