export const emailGestao = 'gestao@casadezoito.com.br'

export const horarios = [
  { dia: 'Segunda a sexta', horario: '8:30 às 18:30' },
  { dia: 'Sábados', horario: '9:00 às 13:00' },
]

export const salasTerreo = [
  { nome: 'Reunião Salão', perfil: 'A menor das três — indicada para reuniões rápidas e objetivas para até 6 pessoas' },
  { nome: 'Reunião Varanda', perfil: 'Tamanho intermediário, com acesso direto ao jardim' },
  { nome: 'Reunião Estar', perfil: 'A maior, com sofá e poltronas — ideal para reuniões mais longas e/ou com mais integrantes' },
]

export const espacosTerreo = [
  'Recepção',
  'Lounge',
  'Espaço Kids',
  'Espaço Gourmet',
  'Wine Bar conectado ao lounge externo',
  'Banheiros: feminino, masculino e PCD',
  'Copa: cafeteira e máquina de água',
]

export const espacosPrimeiroAndar = [
  'Sala de reuniões pequena: para conversas rápidas e reuniões internas de equipe (evitar uso com pessoas externas)',
  'Banheiros: feminino e masculino',
  'Copa: água e café e armários para guarda de bolsas e pertences pessoais',
]

// Função de suporte por departamento — chave usada na rota /manual/<slug>
export const funcoes = {
  recepcao: {
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
  copa: {
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
  limpeza: {
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
  valet: {
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
}

export const regras = [
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

export const recomendacoes = [
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

// Índice das subpáginas do manual, por departamento
export const paginasManual = [
  { slug: '', label: 'Visão geral', resumo: 'Boas-vindas, horários e como a Casa está organizada' },
  { slug: 'recepcao', label: 'Recepção', resumo: 'Central de operações: acolhimento, reservas e chamados' },
  { slug: 'copa', label: 'Copa', resumo: 'Preparo do térreo antes da abertura e apoio às reuniões' },
  { slug: 'limpeza', label: 'Limpeza', resumo: 'Subsolo e 1º andar, e apoio ao térreo antes das 8:30' },
  { slug: 'valet', label: 'Valet & Segurança', resumo: 'Manobra de veículos, entregas pelo subsolo e apoio à segurança' },
  { slug: 'convivencia', label: 'Regras de convivência', resumo: 'Uso, manutenção, conservação e boas práticas' },
]
