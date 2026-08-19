import { useState } from 'react'

function paraInputDatetime(date) {
  const d = new Date(date)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function FormularioReserva({ salas, valoresIniciais, souDono, ehAdmin, onSalvar, onCancelarReserva, onFechar }) {
  const editando = Boolean(valoresIniciais?.id)
  const [salaId, setSalaId] = useState(valoresIniciais.sala_id ?? salas[0]?.id ?? '')
  const [titulo, setTitulo] = useState(valoresIniciais.titulo ?? '')
  const [inicio, setInicio] = useState(paraInputDatetime(valoresIniciais.inicio))
  const [fim, setFim] = useState(paraInputDatetime(valoresIniciais.fim))
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  const podeEditar = !editando || souDono || ehAdmin

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
        titulo,
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
            </div>

            <div className="field">
              <label>Título</label>
              <input value={titulo} onChange={(e) => setTitulo(e.target.value)} disabled={!podeEditar} required placeholder="Ex: Reunião com cliente" />
            </div>

            <div className="form-grid-2">
              <div className="field">
                <label>Início</label>
                <input type="datetime-local" value={inicio} onChange={(e) => setInicio(e.target.value)} disabled={!podeEditar} required />
              </div>
              <div className="field">
                <label>Fim</label>
                <input type="datetime-local" value={fim} onChange={(e) => setFim(e.target.value)} disabled={!podeEditar} required />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {editando && podeEditar && (
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
