import { ManualHeader, FuncaoCard, ManualNav, ContatoGestao } from './componentes'
import { funcoes } from './dados'

export default function Recepcao() {
  return (
    <div>
      <ManualHeader
        titulo="Recepção"
        sub="A central de operações do dia a dia da Casa"
      />

      <FuncaoCard funcao={funcoes.recepcao} />

      <div className="card" style={{ marginTop: 'var(--space-4)' }}>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            O que passa pela recepção
          </span>
          <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <li style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ink)' }}>Reservas:</strong> toda reserva de sala de reunião e de uso exclusivo do Espaço Gourmet / Wine Bar é confirmada pela recepção, que verifica a disponibilidade e avisa as demais empresas quando necessário.
            </li>
            <li style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ink)' }}>Chamados de manutenção:</strong> qualquer avaria em área comum é reportada à recepção, que aciona a equipe da Casa ou o fornecedor. Nada é consertado por conta própria.
            </li>
            <li style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ink)' }}>Conferência das salas:</strong> ao fim de cada reunião, quem usou avisa a recepção; ela avalia o espaço e aciona a limpeza se preciso.
            </li>
            <li style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ink)' }}>Compras das áreas comuns:</strong> as solicitações de compra para os espaços de uso compartilhado são centralizadas pela recepção.
            </li>
            <li style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ink)' }}>Chegada de pessoas:</strong> visitantes e clientes são recebidos e acompanhados pela recepção, e a empresa correspondente é avisada assim que alguém chega.
            </li>
          </ul>
          <ContatoGestao />
        </div>
      </div>

      <ManualNav atual="recepcao" />
    </div>
  )
}
