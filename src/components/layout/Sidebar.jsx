import { NavLink } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useSession } from '../../hooks/useSession'
import { usePerfil } from '../../hooks/usePerfil'
import logoBeige from '../../assets/casadezoito/logo-beige.png'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/agenda', label: 'Agenda das salas', end: true },
  { to: '/minhas-reservas', label: 'Minhas reservas', end: true },
  { to: '/perfil', label: 'Perfil', end: true },
  {
    to: '/configuracoes',
    label: 'Configurações',
    end: true,
    somenteAdmin: true,
    children: [{ to: '/dashboard', label: 'Dashboard', somenteAdmin: true }],
  },
]

export default function Sidebar({ aberto = false, onFechar }) {
  const { session } = useSession()
  const { perfil } = usePerfil()
  const email = session?.user?.email ?? ''
  const iniciais = email.slice(0, 2).toUpperCase()
  const isAdmin = perfil?.role === 'admin'
  const visiveis = links.filter((link) => !link.somenteAdmin || isAdmin)

  async function sair() {
    await supabase.auth.signOut()
  }

  return (
    <nav className={`sidebar${aberto ? ' is-open' : ''}`}>
      <div className="sidebar-brand">
        <img src={logoBeige} alt="Casa Dezoito" style={{ height: 32, width: 'auto', marginBottom: 10 }} />
        <div className="sidebar-logo">salas hub</div>
        <div className="sidebar-tagline">Agenda das salas · Casa Dezoito</div>
      </div>

      <div className="sidebar-section">Menu</div>
      {visiveis.map((link) => (
        <div key={link.to}>
          <NavLink
            to={link.to}
            end={link.end}
            onClick={onFechar}
            className={({ isActive }) => `sidebar-item${isActive ? ' is-active' : ''}`}
          >
            <span className="sidebar-nav-dot" style={{ background: 'currentColor', opacity: 0.6 }} />
            {link.label}
          </NavLink>
          {link.children
            ?.filter((child) => !child.somenteAdmin || isAdmin)
            .map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                onClick={onFechar}
                className={({ isActive }) => `sidebar-item sidebar-subitem${isActive ? ' is-active' : ''}`}
              >
                <span className="sidebar-nav-dot" style={{ background: 'currentColor', opacity: 0.4 }} />
                {child.label}
              </NavLink>
            ))}
        </div>
      ))}

      <div className="sidebar-spacer" />

      <div className="sidebar-footer">
        <span className="avatar avatar-sm">{iniciais || '?'}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sidebar-footer-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</div>
          <button type="button" onClick={sair} className="sidebar-footer-role" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}
