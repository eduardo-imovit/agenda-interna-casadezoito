const vagasSubsolo = [
  { area: 'Veraci', uso: 'Vagas demarcadas de uso exclusivo' },
  { area: 'Imovit', uso: 'Vagas demarcadas de uso exclusivo' },
  { area: 'Montblanc', uso: 'Vagas demarcadas de uso exclusivo' },
  { area: 'Larissa Gimenes & Goma Construtora', uso: 'Vagas compartilhadas entre as duas empresas' },
  { area: 'Clientes – Carga e Descarga', uso: 'Vagas destinadas a visitantes de qualquer empresa da Casa' },
  { area: 'Motos', uso: 'Vagas exclusivas para motocicletas' },
]

const salasTerreo = [
  { nome: 'Reunião Salão', perfil: 'A menor das três — indicada para reuniões rápidas e objetivas para até 6 pessoas' },
  { nome: 'Reunião Varanda', perfil: 'Tamanho intermediário, com acesso direto ao jardim' },
  { nome: 'Reunião Estar', perfil: 'A maior, com sofá e poltronas — ideal para reuniões mais longas e/ou com mais integrantes' },
]

const espacosTerreo = [
  'Recepção',
  'Lounge',
  'Espaço Kids',
  'Espaço Gourmet',
  'Wine Bar conectado ao lounge externo',
  'Banheiros: feminino, masculino e PCD',
  'Copa: cafeteira e máquina de água',
]

const espacosPrimeiroAndar = [
  'Sala de reuniões pequena: para conversas rápidas e reuniões internas de equipe (evitar uso com pessoas externas)',
  'Banheiros: feminino e masculino',
  'Copa: água e café e armários para guarda de bolsas e pertences pessoais',
]

const papelRecepcao = [
  'Agenda e confirma o uso das salas de reunião',
  'Agenda o uso exclusivo do Espaço Gourmet e do Wine Bar, quando solicitado por alguma empresa',
  'Recebe e orienta clientes e visitantes na chegada',
  'Verifica o estado das salas após o uso e aciona a limpeza quando necessário',
  'É o canal de contato para qualquer necessidade relacionada aos espaços comuns',
]

const regras = [
  {
    titulo: 'Uso',
    itens: [
      'Lounge, Espaço Kids, copas e demais áreas comuns são de uso livre, sem necessidade de reserva.',
      'O Espaço Gourmet e o Wine Bar (com a área externa) são de uso livre por padrão.',
      'Uma empresa pode reservar o Espaço Gourmet e o Wine Bar para uso exclusivo; nesse período, o espaço fica restrito a ela.',
      'As salas de reunião — Sala pequena do 1º andar, Reunião Salão, Reunião Varanda e Reunião Estar — funcionam somente mediante reserva prévia. Não há uso espontâneo dessas salas.',
      'Toda reserva de sala de reunião ou de uso exclusivo do Gourmet/Wine Bar é feita diretamente com a recepção, responsável por confirmar a disponibilidade.',
      'Reserve pela duração real da necessidade. Evite reservar "por garantia" ou reservar mais de um espaço para o mesmo compromisso.',
    ],
  },
  {
    titulo: 'Manutenção',
    itens: [
      'Qualquer avaria ou mau funcionamento — ar-condicionado, mobiliário, iluminação, equipamentos etc. — deve ser comunicado à recepção assim que for percebido, mesmo que o uso não tenha sido seu.',
      'Reparos e ajustes em áreas comuns são feitos exclusivamente pela equipe da Casa, acionada pela recepção. Não tente consertar ou ajustar equipamentos por conta própria.',
      'Problemas dentro da sala privativa de cada empresa são resolvidos diretamente por ela; problemas em qualquer área comum são sempre reportados à recepção.',
      'Manutenções preventivas das áreas comuns são agendadas pela gestão da Casa; se alguma delas afetar o uso do seu espaço, a recepção avisará com antecedência.',
    ],
  },
  {
    titulo: 'Conservação',
    itens: [
      'Deixe cada espaço como gostaria de encontrá-lo: sem copos, embalagens ou lixo sobre mesas e bancadas.',
      'Ao final do uso de qualquer sala de reunião, avise a recepção para que ela verifique o estado do espaço.',
      'A recepção avalia a sala após o uso e aciona a equipe de limpeza sempre que necessário.',
      'Pertences pessoais ficam guardados nos armários do 1º andar, não em áreas comuns do térreo.',
      'Qualquer imprevisto, como líquido derramado, item quebrado ou fora do lugar, deve ser comunicado à recepção de imediato, mesmo que já tenha sido resolvido por quem causou.',
    ],
  },
]

const recomendacoes = [
  {
    titulo: 'Sobre as salas de reunião',
    itens: [
      'Se a reunião terminar antes do previsto, avise a recepção para liberar a sala mais cedo.',
      'Evite reservar mais de uma sala para a mesma reunião "para garantir".',
    ],
  },
  {
    titulo: 'Sobre as áreas comuns',
    itens: [
      'Se a sua empresa vai usar o Espaço Gourmet ou o Wine Bar de forma exclusiva, reserve com antecedência junto à recepção para que ela avise as demais empresas.',
      'Fora dos horários de reserva exclusiva, o Espaço Gourmet ou o Wine Bar seguem abertos para todas as empresas. Bom senso na divisão do espaço é o que faz esse uso livre funcionar.',
      'O Espaço Kids é comum a todas as empresas. Combine com a recepção em caso de eventos ou uso mais prolongado.',
    ],
  },
  {
    titulo: 'Sobre a rotina geral',
    itens: [
      'Sempre que notar algo fora do lugar, vale avisar a recepção mesmo que o uso não tenha sido seu.',
      'Visitantes e clientes devem, sempre que possível, ser recebidos e acompanhados pela recepção, mantendo a experiência de chegada consistente para todas as empresas.',
    ],
  },
]

function Secao({ eyebrow, titulo, children }) {
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

function ListaCard({ titulo, itens }) {
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

export default function Manual() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Casa Dezoito · 2026</div>
          <div className="page-title">Manual de uso e convivência</div>
          <div className="page-sub">Como aproveitar, cuidar e viver a casa</div>
        </div>
      </div>

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
            Guarde este documento como referência rápida. Ele reúne como a Casa está organizada, como funciona o
            uso dos espaços e das salas de reunião, o papel da recepção e do valet, e algumas recomendações
            práticas para tornar o dia a dia mais leve.
          </p>
        </div>
      </div>

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
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Área</th>
                  <th>Uso</th>
                </tr>
              </thead>
              <tbody>
                {vagasSubsolo.map((linha) => (
                  <tr key={linha.area}>
                    <td>{linha.area}</td>
                    <td>{linha.uso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      <Secao eyebrow="Suporte" titulo="Recepção">
        <ListaCard
          titulo="A Casa conta com um serviço de recepção responsável pela gestão do espaço no dia a dia"
          itens={papelRecepcao}
        />
      </Secao>

      <Secao eyebrow="Regras" titulo="Uso, manutenção e conservação">
        <p style={{ marginTop: 0, marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
          Para que a experiência da Casa seja sempre a mesma, independentemente de quem está usando o espaço, as
          regras abaixo valem para todas as empresas, colaboradores e visitantes da Casa Dezoito.
        </p>
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

      <div style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }} className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            Uma Casa vivida com intenção
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            Este manual vai evoluir junto com a Casa. Se algo aqui não fizer mais sentido no dia a dia, ou se
            surgir uma prática que vale a pena virar regra, converse com a recepção ou com a gestão da Casa
            Dezoito.
          </p>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink)', fontWeight: 'var(--weight-medium)' }}>
            Obrigado por fazer parte dessa Casa. E por cuidar dela como se fosse sua.
          </p>
        </div>
      </div>
    </div>
  )
}
