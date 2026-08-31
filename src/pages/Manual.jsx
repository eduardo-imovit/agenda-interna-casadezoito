import estacionamento from '../assets/casadezoito/estacionamento.webp'

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

const emailGestao = 'gestao@casadezoito.com.br'

const horarios = [
  { dia: 'Segunda a sexta', horario: '8:30 às 18:30' },
  { dia: 'Sábados', horario: '9:00 às 13:00' },
]

const funcoes = [
  {
    nome: 'Recepcionista',
    missao:
      'Ser o primeiro ponto de contato e a central de operações do dia a dia, garantindo boa experiência ao cliente e organização dos espaços compartilhados.',
    blocos: [
      {
        titulo: 'Responsabilidades',
        itens: [
          'Recepção e acolhimento de clientes e visitantes',
          'Avisar a empresa correspondente sempre que houver alguém esperando',
          'Gestão de reservas de salas de reunião e demais espaços compartilhados',
          'Zelar pelas regras de uso, manutenção e conservação dos ambientes comuns (conforme Manual de Convivência)',
          'Reportar problemas de manutenção às empresas responsáveis ou fornecedores',
          'Ser a referência para dúvidas gerais sobre o funcionamento da casa',
          'Centralizar as solicitações de compras para as áreas de uso comum',
        ],
      },
    ],
    naoFaz: 'Limpeza física dos espaços, serviço de copa, manobra de veículos.',
  },
  {
    nome: 'Copeira',
    missao:
      'Garantir que o térreo esteja pronto e impecável para receber clientes, e apoiar as reuniões ao longo do expediente.',
    blocos: [
      {
        titulo: 'Antes das 8:30 — vistoria pré-abertura',
        itens: [
          'Retirar lixo dos banheiros do térreo',
          'Abrir persianas e janelas das salas',
          'Verificar insumos (café, água, copos, papel, sabonete etc.) e repor o que faltar',
        ],
      },
      {
        titulo: 'Depois das 8:30 — apoio às reuniões',
        itens: [
          'Servir água e café nas reuniões',
          'Fazer limpeza rápida (organizar mesa, copos, louça, migalhas) ao final de cada reunião',
        ],
      },
    ],
    naoFaz:
      'Limpeza pesada com balde e vassoura no térreo após 8:30, nem limpeza do subsolo ou do 1º andar.',
  },
  {
    nome: 'Equipe de Limpeza',
    missao:
      'Manter o subsolo e o 1º andar sempre limpos, e apoiar a copeira na preparação do térreo antes da abertura — sem nunca comprometer a experiência do cliente durante o expediente.',
    blocos: [
      {
        titulo: 'Antes das 8:30 — apoio ao térreo',
        itens: [
          'Ajudar a copeira a deixar o térreo limpo, sem lixo nos banheiros e nas lixeiras das salas',
          'Molhar as plantas internas',
          'Verificação geral de ordem do ambiente',
        ],
      },
      {
        titulo: 'Depois das 8:30 — subsolo e 1º andar',
        itens: [
          'Limpeza e arrumação completa do subsolo',
          'Limpeza e arrumação completa do 1º andar',
        ],
      },
    ],
    atencao:
      'Proibido limpar o térreo com balde e vassoura após as 8:30 — essa cena não pode ser vista pelos clientes.',
  },
  {
    nome: 'Valet',
    missao:
      'Cuidar da chegada de veículos e do fluxo de entregas, além de atuar como apoio à segurança da casa.',
    blocos: [
      {
        titulo: 'Responsabilidades',
        itens: [
          'Manobrista das vagas em frente à loja',
          'Orientar motoboys a realizar entregas exclusivamente pelo subsolo',
          'Apoio à segurança: identificar situações estranhas ou suspeitas e acionar a equipe de monitoramento e, se necessário, a polícia',
        ],
      },
    ],
    naoFaz: 'Atendimento de reservas de sala, limpeza, serviço de copa.',
    atencao:
      'Entregas de motoboy nunca pela recepção do térreo, ao lado dos clientes — sempre pelo subsolo.',
  },
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

function FuncaoCard({ funcao }) {
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
            uso dos espaços e das salas de reunião, as funções da equipe operacional e algumas recomendações
            práticas para tornar o dia a dia mais leve.
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
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
            Dúvidas ou solicitações para a gestão da Casa:{' '}
            <a href={`mailto:${emailGestao}`} style={{ color: 'var(--primary)', fontWeight: 'var(--weight-medium)' }}>
              {emailGestao}
            </a>
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

      <Secao eyebrow="Suporte" titulo="Funções de Suporte">
        <p style={{ marginTop: 0, marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
          A Casa conta com uma equipe operacional própria. Cada função abaixo tem uma rotina definida, uma linha
          de corte clara em relação às outras, e um ponto de contato: assim não há atividade sem dono nem
          sobreposição entre as pessoas do time.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {funcoes.map((funcao) => (
            <FuncaoCard key={funcao.nome} funcao={funcao} />
          ))}
        </div>

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
            surgir uma prática que vale a pena virar regra, converse com a recepção ou escreva para a gestão da
            Casa Dezoito em{' '}
            <a href={`mailto:${emailGestao}`} style={{ color: 'var(--primary)', fontWeight: 'var(--weight-medium)' }}>
              {emailGestao}
            </a>
            .
          </p>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink)', fontWeight: 'var(--weight-medium)' }}>
            Obrigado por fazer parte dessa Casa. E por cuidar dela como se fosse sua.
          </p>
        </div>
      </div>
    </div>
  )
}
