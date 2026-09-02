import { ManualHeader, Secao, ListaCard, ManualNav, ContatoGestao } from './componentes'
import { regras, recomendacoes } from './dados'

export default function Convivencia() {
  return (
    <div>
      <ManualHeader
        titulo="Regras de convivência"
        sub="Uso, manutenção e conservação dos espaços — vale para todas as empresas, colaboradores e visitantes"
      />

      <div className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            Para que a experiência da Casa seja sempre a mesma, independentemente de quem está usando o espaço,
            as regras abaixo valem para todos. Elas são zeladas pela recepção, que é o ponto de contato para
            reservas, chamados e qualquer imprevisto.
          </p>
          <ContatoGestao />
        </div>
      </div>

      <Secao eyebrow="Regras" titulo="Uso, manutenção e conservação">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {regras.map((bloco) => (
            <ListaCard key={bloco.titulo} titulo={bloco.titulo} itens={bloco.itens} />
          ))}
        </div>
      </Secao>

      <Secao eyebrow="Boas práticas" titulo="Recomendações para uma boa convivência">
        <p style={{ marginTop: 0, marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
          Além das regras, algumas práticas simples ajudam a manter a experiência da Casa consistente com o que
          ela se propõe a ser e evitam pequenos atritos no dia a dia entre as empresas.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {recomendacoes.map((bloco) => (
            <ListaCard key={bloco.titulo} titulo={bloco.titulo} itens={bloco.itens} />
          ))}
        </div>
      </Secao>

      <ManualNav atual="convivencia" />
    </div>
  )
}
