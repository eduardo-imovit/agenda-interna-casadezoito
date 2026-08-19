import { useState } from 'react'
import { useUsuarios } from '../../hooks/useUsuarios'
import { useSession } from '../../hooks/useSession'

export default function PainelUsuarios() {
  const { usuarios, carregando, pedirResetSenha, excluirUsuario, alterarPapel } = useUsuarios()
  const { session } = useSession()
  const [mensagem, setMensagem] = useState(null)
  const [processando, setProcessando] = useState(null)

  async function handleAlternarPapel(usuario) {
    const novoRole = usuario.role === 'admin' ? 'colaborador' : 'admin'
    if (usuario.id === session?.user?.id && novoRole === 'colaborador') {
      const confirmado = window.confirm('Isso é a sua própria conta. Tem certeza que quer tirar seu acesso de admin?')
      if (!confirmado) return
    }
    setProcessando(usuario.id)
    setMensagem(null)
    try {
      await alterarPapel(usuario.id, novoRole)
      setMensagem({ tipo: 'ok', texto: `${usuario.nome || usuario.email} agora é ${novoRole}.` })
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível alterar o papel dessa conta.' })
    } finally {
      setProcessando(null)
    }
  }

  async function handleResetSenha(usuario) {
    setProcessando(usuario.id)
    setMensagem(null)
    try {
      await pedirResetSenha(usuario.email)
      setMensagem({ tipo: 'ok', texto: `Link de redefinição enviado para ${usuario.email}.` })
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível enviar o link de redefinição.' })
    } finally {
      setProcessando(null)
    }
  }

  async function handleExcluir(usuario) {
    const confirmado = window.confirm(
      `Excluir a conta de ${usuario.nome || usuario.email}?\n\nIsso apaga o login e as reservas dele(a). Não pode ser desfeito.`,
    )
    if (!confirmado) return
    setProcessando(usuario.id)
    setMensagem(null)
    try {
      await excluirUsuario(usuario.id)
      setMensagem({ tipo: 'ok', texto: `Conta de ${usuario.nome || usuario.email} excluída.` })
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível excluir essa conta.' })
    } finally {
      setProcessando(null)
    }
  }

  if (carregando) return <div className="hub-loading">Carregando…</div>

  return (
    <div>
      {mensagem && (
        <div className={mensagem.tipo === 'erro' ? 'login-error' : 'stat-sub'} style={{ marginBottom: 'var(--space-4)' }}>
          {mensagem.texto}
        </div>
      )}

      <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Empresa</th>
            <th>Papel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nome || '—'}</td>
              <td>{u.email}</td>
              <td>{u.empresas?.nome || '—'}</td>
              <td><span className={`badge ${u.role === 'admin' ? 'badge-primary' : 'badge-gray'}`}>{u.role}</span></td>
              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                <button type="button" className="btn-link" disabled={processando === u.id} onClick={() => handleAlternarPapel(u)}>
                  {u.role === 'admin' ? 'Tornar colaborador' : 'Tornar admin'}
                </button>
                <button type="button" className="btn-link" style={{ marginLeft: 16 }} disabled={processando === u.id} onClick={() => handleResetSenha(u)}>
                  Pedir reset de senha
                </button>
                <button
                  type="button"
                  className="btn-link"
                  style={{ color: 'var(--danger)', marginLeft: 16 }}
                  disabled={processando === u.id}
                  onClick={() => handleExcluir(u)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
