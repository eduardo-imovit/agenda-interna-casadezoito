import { useState } from 'react'
import Sidebar from './Sidebar'

export default function AppShell({ children }) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="app-shell">
      <div className="app-topbar">
        <button type="button" className="app-topbar-burger" onClick={() => setMenuAberto(true)} aria-label="Abrir menu">☰</button>
        <span className="app-topbar-title">salas hub</span>
      </div>

      {menuAberto && <div className="sidebar-backdrop" onClick={() => setMenuAberto(false)} />}
      <Sidebar aberto={menuAberto} onFechar={() => setMenuAberto(false)} />

      <main className="app-main">{children}</main>
    </div>
  )
}
