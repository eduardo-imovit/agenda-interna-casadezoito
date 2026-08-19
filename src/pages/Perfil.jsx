import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePerfil } from '../hooks/usePerfil'
import { useSession } from '../hooks/useSession'
import { supabase } from '../lib/supabaseClient'

const MENSAGENS = {
  conectado: { texto: 'Google Calendar conectado! Suas próximas reservas vão aparecer na sua agenda pessoal.', tipo: 'success' },
  erro: { texto: 'Não foi possível conectar ao Google. Tente novamente.', tipo: 'danger' },
  reconectar: { texto: 'Precisa reconectar: revogue o acesso em myaccount.google.com/permissions e tente de novo.', tipo: 'warning' },
}

export default function Perfil() {
  const { perfil, carregando } = usePerfil()
  const { session } = useSession()
  const [searchParams] = useSearchParams()
  const [conectando, setConectando] = useState(false)

  const mensagem = MENSAGENS[searchParams.get('google')]

  async function conectarGoogle() {
    setConectando(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-oauth-start`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      const { url } = await res.json()
      window.location.href = url
    } finally {
      setConectando(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Perfil</div>
          <div className="page-title">Minha conta</div>
        </div>
      </div>

      {mensagem && (
        <div className={`badge badge-${mensagem.tipo}`} style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-2) var(--space-3)' }}>
          {mensagem.texto}
        </div>
      )}

      {carregando ? (
        <div className="hub-loading">Carregando…</div>
      ) : (
        <div className="card card-body" style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="field">
            <label>Nome</label>
            <div>{perfil?.nome}</div>
          </div>
          <div className="field">
            <label>E-mail</label>
            <div>{perfil?.email}</div>
          </div>
          <div className="field">
            <label>Empresa</label>
            <div>{perfil?.empresas?.nome}</div>
          </div>
          <div className="field">
            <label>Google Calendar</label>
            {perfil?.google_connected ? (
              <span className="badge badge-success" style={{ width: 'fit-content' }}>Conectado</span>
            ) : (
              <button type="button" className="btn btn-secondary btn-sm" style={{ width: 'fit-content' }} onClick={conectarGoogle} disabled={conectando}>
                {conectando ? 'Abrindo…' : 'Conectar Google Calendar'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
