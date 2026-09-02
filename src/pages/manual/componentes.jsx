import { NavLink } from 'react-router-dom'
import { emailGestao, paginasManual } from './dados'

export function Secao({ eyebrow, titulo, children }) {
  return (
    <div style={{ marginTop: 'var(--space-8)' }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">{eyebrow}</div>
          <div className="page-title">{titulo}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

export function ListaCard({ titulo, itens }) {
  return (
    <div className="card">
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>{titulo}</span>
        <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {itens.map((item) => (
            <li key={item} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function FuncaoCard({ funcao }) {
  return (
    <div className="card">
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>{funcao.nome}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{funcao.missao}</span>
        </div>

        {funcao.blocos.map((bloco) => (
          <div key={bloco.titulo} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--ink)' }}>{bloco.titulo}</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {bloco.itens.map((item) => (
                <li key={item} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {funcao.naoFaz && (
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--ink)' }}>Não faz:</strong> {funcao.naoFaz}
          </p>
        )}

        {funcao.atencao && (
          <p
            style={{
              margin: 0,
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--warning-soft)',
              fontSize: 'var(--text-sm)',
              color: 'var(--ink-mid)',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: 'var(--warning)' }}>Ponto de atenção:</strong> {funcao.atencao}
          </p>
        )}
      </div>
    </div>
  )
}

// Bloco de coordenação copeira × limpeza, mostrado nas duas páginas
export function CorteOitoEMeia() {
  return (
    <div className="card" style={{ marginTop: 'var(--space-4)' }}>
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
          Corte operacional das 8:30
        </span>
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
          O horário das 8:30 é a linha divisória do dia na Casa. Até lá, copeira e limpeza trabalham juntas
          preparando o térreo para a abertura. A partir das 8:30, o térreo passa a ser vitrine — só a copeira
          circula por ali, com serviço discreto durante as reuniões — enquanto a limpeza se dedica ao subsolo
          e ao 1º andar.
        </p>
      </div>
    </div>
  )
}

// Cabeçalho padrão de cada subpágina do manual
export function ManualHeader({ eyebrow = 'Manual da Casa', titulo, sub }) {
  return (
    <div className="page-header">
      <div>
        <div className="page-eyebrow">{eyebrow}</div>
        <div className="page-title">{titulo}</div>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
    </div>
  )
}

// Navegação entre as subpáginas, repetida no rodapé de cada uma
export function ManualNav({ atual }) {
  return (
    <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div className="page-eyebrow">Outras seções do manual</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
        {paginasManual
          .filter((p) => p.slug !== atual)
          .map((p) => (
            <NavLink
              key={p.slug}
              to={p.slug ? `/manual/${p.slug}` : '/manual'}
              className="card"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--ink)' }}>{p.label}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{p.resumo}</span>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  )
}

export function ContatoGestao() {
  return (
    <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
      Dúvidas ou solicitações para a gestão da Casa:{' '}
      <a href={`mailto:${emailGestao}`} style={{ color: 'var(--primary)', fontWeight: 'var(--weight-medium)' }}>
        {emailGestao}
      </a>
    </p>
  )
}
