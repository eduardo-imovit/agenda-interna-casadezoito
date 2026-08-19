export default function KpiCard({ label, valor, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{valor}</div>
      {sub && <div className="stat-sub is-muted">{sub}</div>}
    </div>
  )
}
