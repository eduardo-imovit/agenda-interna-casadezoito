import { useState } from 'react'
import PainelSalas from '../components/config/PainelSalas'
import PainelUsuarios from '../components/config/PainelUsuarios'

const ABAS = [
  { id: 'salas', label: 'Salas' },
  { id: 'usuarios', label: 'Usuários' },
]

export default function Configuracoes() {
  const [aba, setAba] = useState('salas')

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Administração</div>
          <div className="page-title">Configurações</div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
        {ABAS.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`tab${aba === a.id ? ' is-active' : ''}`}
            onClick={() => setAba(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>

      {aba === 'salas' ? <PainelSalas /> : <PainelUsuarios />}
    </div>
  )
}
