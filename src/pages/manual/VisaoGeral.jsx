import { NavLink } from 'react-router-dom'
import estacionamento from '../../assets/casadezoito/estacionamento.webp'
import { ManualHeader, Secao, ContatoGestao } from './componentes'
import { horarios, salasTerreo, espacosTerreo, espacosPrimeiroAndar, paginasManual } from './dados'

export default function VisaoGeral() {
  return (
    <div>
      <ManualHeader
        eyebrow="Casa Dezoito · 2026"
        titulo="Manual de uso e convivência"
        sub="Como aproveitar, cuidar e viver a casa"
      />

      <div className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            Bem-vindo à Casa Dezoito
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            A Casa Dezoito não é um prédio comercial, é uma Casa. Foi pensada para receber as pessoas com a mesma
            intenção com que se recebe alguém na própria sala de estar: com cuidado, presença e respeito pelo
            espaço e por quem divide ele com você.
          </p>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            Hoje a Casa reúne a Imovit, a Veraci, a Montblanc, a Larissa Gimenes, a Goma Construtora e o Café
            Sterna. Empresas diferentes, times diferentes, rotinas diferentes. Mas todos convivendo debaixo do
            mesmo teto. Este manual existe para que essa convivência funcione: que cada espaço comum esteja
            sempre pronto para ser usado, e que o cuidado de um não vire trabalho extra para o outro.
          </p>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            Este manual está dividido por área. Cada função da equipe operacional tem sua própria seção, com a
            rotina e a linha de corte em relação às outras. Empresas e colaboradores encontram tudo sobre o uso
            dos espaços na seção de convivência.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 'var(--space-4)' }}>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            Horários de funcionamento
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {horarios.map((h) => (
              <div key={h.dia} style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                <span style={{ color: 'var(--ink)', fontWeight: 'var(--weight-medium)', minWidth: 140 }}>{h.dia}</span>
                <span style={{ color: 'var(--ink-mid)' }}>{h.horario}</span>
              </div>
            ))}
          </div>
          <ContatoGestao />
        </div>
      </div>

      <Secao eyebrow="Seções" titulo="O manual por área">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
          {paginasManual
            .filter((p) => p.slug !== '')
            .map((p) => (
              <NavLink
                key={p.slug}
                to={`/manual/${p.slug}`}
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
      </Secao>

      <Secao eyebrow="Estrutura" titulo="Como a Casa está organizada">
        <p style={{ marginTop: 0, marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
          A Casa Dezoito é dividida em três pavimentos. Cada empresa tem sua área privativa, e os três andares têm
          espaços de uso comum, que sustentam a experiência de todos: de clientes a colaboradores.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            Subsolo — vagas e acessos
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
            O subsolo é dividido em vagas de uso demarcado por empresa, além de vagas para motos e para clientes.
            O Café Sterna não possui vaga própria demarcada no subsolo e poderá usar a vaga de clientes para carga
            e descarga.
          </p>
          <img
            src={estacionamento}
            alt="Mapa do estacionamento do subsolo com as vagas demarcadas por empresa"
            style={{ width: '100%', maxWidth: 640, borderRadius: 'var(--radius-md)', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            Térreo — recepção e experiência
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
            O térreo concentra a experiência de chegada e convivência da Casa. O Café Sterna opera sua loja neste
            pavimento: uma área de uso privativo do Sterna, mas de acesso aberto a todos.
          </p>
          <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {espacosTerreo.map((item) => (
              <li key={item} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>

          <p style={{ margin: 0, marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--ink-mid)' }}>
            Três salas de reunião completam o térreo:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
            {salasTerreo.map((sala) => (
              <div key={sala.nome} className="card">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--ink)' }}>{sala.nome}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{sala.perfil}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            1º andar — salas privativas e área comum de trabalho
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
            Cada empresa tem sua sala privativa neste pavimento, com exceção do Café Sterna, cuja operação
            acontece somente no térreo.
          </p>
          <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {espacosPrimeiroAndar.map((item) => (
              <li key={item} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>
      </Secao>

      <div style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }} className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            Uma Casa vivida com intenção
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            Este manual vai evoluir junto com a Casa. Se algo aqui não fizer mais sentido no dia a dia, ou se
            surgir uma prática que vale a pena virar regra, converse com a recepção ou escreva para a gestão da
            Casa Dezoito.
          </p>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink)', fontWeight: 'var(--weight-medium)' }}>
            Obrigado por fazer parte dessa Casa. E por cuidar dela como se fosse sua.
          </p>
        </div>
      </div>
    </div>
  )
}
