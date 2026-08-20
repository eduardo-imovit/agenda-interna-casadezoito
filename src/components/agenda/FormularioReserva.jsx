import { useState } from 'react'
import { useEmpresas } from '../../hooks/useEmpresas'
import { useUsuarios } from '../../hooks/useUsuarios'

function paraInputDatetime(date) {
  const d = new Date(date)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function FormularioReserva({ salas, valoresIniciais, nomeUsuario, empresaIdUsuario, souDono, ehAdmin, onSalvar, onCancelarReserva, onFechar }) {
  const { empresas } = useEmpresas()
  const { usuarios } = useUsuarios()
  const editando = Boolean(valoresIniciais?.id)
  const [salaId, setSalaId] = useState(valoresIniciais.sala_id ?? salas[0]?.id ?? '')
  const [empresaId, setEmpresaId] = useState(valoresIniciais.empresa_id ?? empresaIdUsuario ?? '')
  const [titulo, setTitulo] = useState(valoresIniciais.titulo ?? '')
  const [responsavel, setResponsavel] = useState(valoresIniciais.responsavel ?? nomeUsuario ?? '')
  const [convidados, setConvidados] = useState((valoresIniciais.convidados ?? []).join(', '))
  const [inicio, setInicio] = useState(paraInputDatetime(valoresIniciais.inicio))
  const [fim, setFim] = useState(paraInputDatetime(valoresIniciais.fim))
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  const podeEditar = !editando || souDono
  const podeCancelar = editando && (souDono || ehAdmin)
  const salaSelecionada = salas.find((s) => s.id === salaId)
  const usuariosDaEmpresa = empresaId ? usuarios.filter((u) => u.empresa_id === empresaId) : usuarios

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    if (new Date(fim) <= new Date(inicio)) {
      setErro('O horário de término precisa ser depois do início.')
      return
    }
    setSalvando(true)
    try {
      await onSalvar({
        sala_id: salaId,
        empresa_id: empresaId,
        titulo,
        responsavel,
        convidados: convidados.split(',').map((c) => c.trim()).filter(Boolean),
        inicio: new Date(inicio).toISOString(),
        fim: new Date(fim).toISOString(),
      })
      onFechar()
    } catch (err) {
      setErro(err.message?.includes('reservas_sem_conflito') ? 'Já existe uma reserva nesse horário para essa sala.' : 'Não foi possível salvar.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleCancelar() {
    setSalvando(true)
    try {
      await onCancelarReserva()
      onFechar()
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{editando ? 'Editar reserva' : 'Nova reserva'}</div>
          <button type="button" className="modal-close" onClick={onFechar}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {erro && <div className="login-error">{erro}</div>}

            <div className="field">
              <label>Sala</label>
              <select value={salaId} onChange={(e) => setSalaId(e.target.value)} disabled={!podeEditar} required>
                {salas.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
              {salaSelecionada && (
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)' }}>
                  {salaSelecionada.andar ? `${salaSelecionada.andar} · ` : ''}
                  {salaSelecionada.capacidade ? `${salaSelecionada.capacidade} lugares` : 'Capacidade não informada'}
                </span>
              )}
            </div>

            <div className="field">
              <label>Empresa</label>
              <select
                value={empresaId}
                onChange={(e) => { setEmpresaId(e.target.value); setResponsavel('') }}
                disabled={!podeEditar}
                required
              >
                <option value="" disabled>Selecione…</option>
                {empresas.map((emp) => <option key={emp.id} value={emp.id}>{emp.nome}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Título</label>
              <input value={titulo} onChange={(e) => setTitulo(e.target.value)} disabled={!podeEditar} required placeholder="Ex: Reunião com cliente" />
            </div>

            <div className="field">
              <label>Responsável pela reunião</label>
              <select value={responsavel} onChange={(e) => setResponsavel(e.target.value)} disabled={!podeEditar} required>
                <option value="" disabled>Selecione…</option>
                {usuariosDaEmpresa.map((u) => <option key={u.id} value={u.nome}>{u.nome}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Convidados</label>
              <input
                value={convidados}
                onChange={(e) => setConvidados(e.target.value)}
                disabled={!podeEditar}
                placeholder="Nomes ou e-mails separados por vírgula"
              />
              <span className="field-hint">Opcional. Separe mais de um convidado por vírgula.</span>
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Início</label>
                <input type="datetime-local" step={900} value={inicio} onChange={(e) => setInicio(e.target.value)} disabled={!podeEditar} required />
              </div>
              <div className="field">
                <label>Fim</label>
                <input type="datetime-local" step={900} value={fim} onChange={(e) => setFim(e.target.value)} disabled={!podeEditar} required />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {podeCancelar && (
              <button type="button" className="btn btn-danger" onClick={handleCancelar} disabled={salvando}>
                Cancelar reserva
              </button>
            )}
            <button type="button" className="btn btn-secondary" onClick={onFechar}>Fechar</button>
            {podeEditar && (
              <button type="submit" className="btn btn-primary" disabled={salvando}>
                {salvando ? 'Salvando…' : 'Salvar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
