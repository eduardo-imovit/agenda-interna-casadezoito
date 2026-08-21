const primeirosPassos = [
  {
    titulo: 'Criar conta',
    itens: [
      'Na tela de login, clique em "Criar conta".',
      'Informe nome, empresa (obrigatório — a lista já vem com as empresas cadastradas na Casa) e a senha desejada.',
      'Você recebe um e-mail de confirmação. Clique no link dele pra ativar a conta antes de entrar. Se não chegar, use "Reenviar e-mail de confirmação" (confira a caixa de spam também).',
    ],
  },
  {
    titulo: 'Entrar e recuperar senha',
    itens: [
      'Use e-mail e senha na tela de login.',
      'Esqueceu a senha? "Esqueci a senha" envia um link de redefinição pro seu e-mail.',
    ],
  },
]

const camposReserva = [
  { campo: 'Sala', explicacao: 'Qual sala você quer usar. Andar e capacidade aparecem embaixo do campo.' },
  { campo: 'Empresa', explicacao: 'A empresa responsável pela reunião — filtra quem aparece no campo Responsável.' },
  { campo: 'Título', explicacao: 'Nome da reunião, aparece na agenda pra todo mundo ver.' },
  { campo: 'Responsável pela reunião', explicacao: 'Quem a organiza — lista de usuários da empresa selecionada.' },
  { campo: 'Convidados', explicacao: 'Opcional. Nomes ou e-mails separados por vírgula. Todo endereço que for um e-mail válido recebe um convite automático do Google Calendar (ver seção abaixo).' },
  { campo: 'Início / Fim', explicacao: 'Os horários encaixam automaticamente em blocos de 15 minutos.' },
]

const permissoes = [
  'Qualquer pessoa da Casa pode reservar uma sala livre, em qualquer horário disponível.',
  'Só quem criou a reserva (o "dono") pode editar os detalhes — sala, horário, título, convidados etc.',
  'O dono da reserva ou um admin podem cancelá-la. Um admin não pode editar os detalhes de uma reserva de outra pessoa, só cancelar.',
  'Duas reservas não podem se sobrepor na mesma sala — o sistema bloqueia o conflito automaticamente.',
]

function Secao({ eyebrow, titulo, children, admin }) {
  return (
    <div style={{ marginTop: 'var(--space-8)' }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">
            {eyebrow}
            {admin && <span className="badge badge-primary" style={{ marginLeft: 'var(--space-2)', verticalAlign: 'middle' }}>Só admins</span>}
          </div>
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

export default function ComoUsar() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Salas Hub</div>
          <div className="page-title">Como usar o sistema</div>
          <div className="page-sub">Guia rápido pra reservar salas, convidar pessoas e acompanhar sua agenda</div>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            O que é o Salas Hub
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            É o sistema de agenda das salas de reunião da Casa Dezoito. Aqui você reserva uma sala, vê o que já
            está marcado no dia, convida pessoas pra sua reunião e acompanha suas próprias reservas — tudo pelo
            navegador, do computador ou do celular.
          </p>
        </div>
      </div>

      <Secao eyebrow="Começando" titulo="Primeiros passos">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {primeirosPassos.map((bloco) => (
            <ListaCard key={bloco.titulo} titulo={bloco.titulo} itens={bloco.itens} />
          ))}
        </div>
      </Secao>

      <Secao eyebrow="Reservas" titulo="Reservando uma sala">
        <p style={{ marginTop: 0, marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
          Duas formas de reservar: pelo mapa na Home (clique numa sala) ou pela Agenda das salas, no botão
          "+ Nova reserva".
        </p>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Campo</th>
                <th>O que é</th>
              </tr>
            </thead>
            <tbody>
              {camposReserva.map((c) => (
                <tr key={c.campo}>
                  <td style={{ whiteSpace: 'nowrap', fontWeight: 'var(--weight-medium)' }}>{c.campo}</td>
                  <td>{c.explicacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Secao>

      <Secao eyebrow="Convites" titulo="Convite automático por e-mail">
        <ListaCard
          titulo="Como funciona"
          itens={[
            'Todo endereço de e-mail válido colocado em "Convidados" recebe um convite de calendário assim que a reserva é salva.',
            'O convidado não precisa ter conta no Salas Hub nem no Google — o convite chega em qualquer caixa de e-mail (Gmail, Outlook, etc.), como qualquer convite de agenda.',
            'Pra isso funcionar, quem cria a reserva precisa ter conectado o próprio Google Calendar em "Perfil" (veja a seção abaixo). Sem isso, a reserva é salva normalmente, mas nenhum convite é enviado.',
            'Se editar a reserva depois (horário, título ou lista de convidados), o convite é atualizado automaticamente. Se cancelar, os convidados recebem o cancelamento.',
          ]}
        />
      </Secao>

      <Secao eyebrow="Agenda" titulo="Vendo a agenda do dia">
        <ListaCard
          titulo="Na página Agenda das salas"
          itens={[
            'Cada sala tem uma cor — a mesma cor aparece no mapa da Home e nos eventos da agenda.',
            'Use as setas (‹ ›) ou "Hoje" pra navegar entre os dias.',
            'O filtro "Sala" mostra só os horários de uma sala específica.',
            'Clique em qualquer reserva pra abrir os detalhes (e editar, se você for o dono).',
            'No celular, a agenda aparece como uma lista dos horários do dia; no computador, como uma grade por horário.',
          ]}
        />
      </Secao>

      <Secao eyebrow="Gestão" titulo="Editando, cancelando e permissões">
        <ListaCard titulo="Quem pode fazer o quê" itens={permissoes} />
      </Secao>

      <Secao eyebrow="Histórico" titulo="Minhas reservas">
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
          Lista todas as suas reservas, passadas e futuras, com status (confirmada ou cancelada). É por aqui que
          você edita ou cancela uma reserva sua sem precisar achar o dia certo na agenda.
        </p>
      </Secao>

      <Secao eyebrow="Conta" titulo="Seu perfil">
        <ListaCard
          titulo="Página Perfil"
          itens={[
            'Mostra seu nome, e-mail e empresa cadastrados.',
            '"Conectar Google Calendar" liga sua conta Google — necessário pra suas reservas aparecerem na sua agenda pessoal e pra convites automáticos serem enviados aos convidados.',
            'Se precisar reconectar (ex: erro de permissão), revogue o acesso em myaccount.google.com/permissions e conecte de novo.',
          ]}
        />
      </Secao>

      <Secao eyebrow="Administração" titulo="Salas, usuários e dashboard" admin>
        <p style={{ marginTop: 0, marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
          Contas com papel "admin" veem um item extra no menu: Configurações (com abas Salas e Usuários) e
          Dashboard.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <ListaCard
            titulo="Configurações → Salas"
            itens={[
              'Cadastra novas salas (nome, andar, capacidade, cor).',
              'Editar altera nome, andar e capacidade direto na tabela.',
              'A caixinha "Ativa" esconde uma sala sem apagar seu histórico de reservas.',
              'Excluir remove a sala de vez — só funciona se ela nunca teve reserva; caso contrário, desative em vez de excluir.',
              'É também aqui (na Home, botão "Editar mapa") que se posicionam as salas no mapa da planta do prédio.',
            ]}
          />
          <ListaCard
            titulo="Configurações → Usuários"
            itens={[
              '"Tornar admin" / "Tornar colaborador" alterna o papel da conta.',
              '"Pedir reset de senha" envia um link de redefinição pro e-mail da pessoa.',
              '"Excluir" apaga o login e as reservas da pessoa — não pode ser desfeito.',
            ]}
          />
          <ListaCard
            titulo="Dashboard"
            itens={[
              'Visão geral de uso das salas — números e indicadores pra gestão acompanhar a ocupação.',
            ]}
          />
        </div>
      </Secao>

      <div style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }} className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', color: 'var(--ink)' }}>
            Dúvidas ou problemas?
          </span>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            Fale com um admin do sistema — ele consegue ver e ajustar salas, usuários e reservas direto pela tela
            de Configurações.
          </p>
        </div>
      </div>
    </div>
  )
}
