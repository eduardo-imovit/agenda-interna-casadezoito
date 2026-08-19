import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useSession } from '../hooks/useSession'
import { useEmpresas } from '../hooks/useEmpresas'
import logoBrown from '../assets/casadezoito/logo-brown.png'

export default function Login() {
  const { session, carregando } = useSession()
  const { empresas } = useEmpresas()
  const [modo, setModo] = useState('entrar')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [empresaId, setEmpresaId] = useState('')
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (!carregando && session) {
    return <Navigate to="/" replace />
  }

  function trocarModo(novoModo) {
    setModo(novoModo)
    setErro('')
    setAviso('')
  }

  async function handleEntrar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setEnviando(false)
    if (error) setErro('E-mail ou senha inválidos.')
  }

  async function handleCriarConta(e) {
    e.preventDefault()
    setErro('')
    setAviso('')
    if (!empresaId) {
      setErro('Selecione a empresa.')
      return
    }
    setEnviando(true)
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome, empresa_id: empresaId }, emailRedirectTo: window.location.origin },
    })
    setEnviando(false)
    if (error) {
      setErro(error.message.includes('already registered') ? 'Esse e-mail já tem conta.' : 'Não foi possível criar a conta.')
      return
    }
    setAviso('Conta criada! Confirme seu e-mail (se pedido) e faça login.')
    trocarModo('entrar')
  }

  async function handleEsqueciSenha(e) {
    e.preventDefault()
    setErro('')
    setAviso('')
    setEnviando(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    })
    setEnviando(false)
    if (error) {
      setErro('Não foi possível enviar o e-mail de recuperação.')
      return
    }
    setAviso('Se esse e-mail tiver conta, enviamos um link de recuperação.')
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <img src={logoBrown} alt="Casa Dezoito" style={{ height: 40, width: 'auto', marginBottom: 12 }} />
        <div className="login-logo">salas hub</div>
        <div className="login-tagline">Agenda das salas · Casa Dezoito</div>

        {modo === 'entrar' && (
          <form className="login-form" onSubmit={handleEntrar}>
            {erro && <div className="login-error">{erro}</div>}
            {aviso && <div className="stat-sub is-muted">{aviso}</div>}

            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com.br"
              />
            </div>

            <div className="field">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                autoComplete="current-password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary login-submit" disabled={enviando}>
              {enviando ? 'Entrando…' : 'Entrar'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
              <button type="button" className="btn-link" onClick={() => trocarModo('criar-conta')}>Criar conta</button>
              <button type="button" className="btn-link" onClick={() => trocarModo('esqueci-senha')}>Esqueci a senha</button>
            </div>
          </form>
        )}

        {modo === 'criar-conta' && (
          <form className="login-form" onSubmit={handleCriarConta}>
            {erro && <div className="login-error">{erro}</div>}

            <div className="field">
              <label htmlFor="nome-criar">Nome</label>
              <input
                id="nome-criar"
                type="text"
                autoComplete="name"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
              />
            </div>

            <div className="field">
              <label htmlFor="empresa-criar">Empresa</label>
              <select
                id="empresa-criar"
                required
                value={empresaId}
                onChange={(e) => setEmpresaId(e.target.value)}
              >
                <option value="" disabled>Selecione…</option>
                {empresas.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.nome}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="email-criar">E-mail</label>
              <input
                id="email-criar"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com.br"
              />
            </div>

            <div className="field">
              <label htmlFor="senha-criar">Senha</label>
              <input
                id="senha-criar"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="mínimo 6 caracteres"
              />
            </div>

            <button type="submit" className="btn btn-primary login-submit" disabled={enviando}>
              {enviando ? 'Criando…' : 'Criar conta'}
            </button>

            <button type="button" className="btn-link" style={{ fontSize: 'var(--text-xs)' }} onClick={() => trocarModo('entrar')}>
              ← Voltar para login
            </button>
          </form>
        )}

        {modo === 'esqueci-senha' && (
          <form className="login-form" onSubmit={handleEsqueciSenha}>
            {erro && <div className="login-error">{erro}</div>}
            {aviso && <div className="stat-sub is-muted">{aviso}</div>}

            <div className="field">
              <label htmlFor="email-recuperar">E-mail</label>
              <input
                id="email-recuperar"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com.br"
              />
            </div>

            <button type="submit" className="btn btn-primary login-submit" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar link de recuperação'}
            </button>

            <button type="button" className="btn-link" style={{ fontSize: 'var(--text-xs)' }} onClick={() => trocarModo('entrar')}>
              ← Voltar para login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
