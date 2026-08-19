import { useState } from 'react'
import { useSalas } from '../../hooks/useSalas'

const CORES = ['#BA6D59', '#5F7346', '#9C7A45', '#5A6B7D', '#8C4048', '#A67B2E']

export default function PainelSalas() {
  const { salas, criarSala, atualizarSala, excluirSala } = useSalas({ somenteAtivas: false })
  const [novaSala, setNovaSala] = useState({ nome: '', andar: '', capacidade: '', cor: CORES[0] })
  const [criando, setCriando] = useState(false)
  const [mensagem, setMensagem] = useState(null)
  const [excluindo, setExcluindo] = useState(null)

  async function handleCriar(e) {
    e.preventDefault()
    setCriando(true)
    try {
      await criarSala({
        nome: novaSala.nome,
        andar: novaSala.andar || null,
        capacidade: novaSala.capacidade ? Number(novaSala.capacidade) : null,
        cor: novaSala.cor,
      })
      setNovaSala({ nome: '', andar: '', capacidade: '', cor: CORES[0] })
    } finally {
      setCriando(false)
    }
  }

  async function handleExcluir(sala) {
    const confirmado = window.confirm(`Excluir a sala "${sala.nome}"? Não pode ser desfeito.`)
    if (!confirmado) return
    setExcluindo(sala.id)
    setMensagem(null)
    try {
      await excluirSala(sala.id)
    } catch (err) {
      if (err?.code === '23503') {
        setMensagem({
          tipo: 'erro',
          texto: `"${sala.nome}" tem reservas registradas e não pode ser excluída. Desmarque "Ativa" pra escondê-la sem apagar o histórico.`,
        })
      } else {
        setMensagem({ tipo: 'erro', texto: `Não foi possível excluir "${sala.nome}".` })
      }
    } finally {
      setExcluindo(null)
    }
  }

  return (
    <div>
      {mensagem && (
        <div className={mensagem.tipo === 'erro' ? 'login-error' : 'stat-sub'} style={{ marginBottom: 'var(--space-4)' }}>
          {mensagem.texto}
        </div>
      )}

      <table className="data-table" style={{ marginBottom: 'var(--space-6)' }}>
        <thead>
          <tr>
            <th>Cor</th>
            <th>Nome</th>
            <th>Andar</th>
            <th>Capacidade</th>
            <th>Ativa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <SalaRow
              key={sala.id}
              sala={sala}
              onSalvar={(dados) => atualizarSala(sala.id, dados)}
              onExcluir={() => handleExcluir(sala)}
              excluindo={excluindo === sala.id}
            />
          ))}
        </tbody>
      </table>

      <form onSubmit={handleCriar} className="card card-body" style={{ maxWidth: 560, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label>Nova sala</label>
          <input required value={novaSala.nome} onChange={(e) => setNovaSala({ ...novaSala, nome: e.target.value })} placeholder="Nome da sala" />
        </div>
        <div className="field">
          <label>Andar</label>
          <input value={novaSala.andar} onChange={(e) => setNovaSala({ ...novaSala, andar: e.target.value })} />
        </div>
        <div className="field">
          <label>Capacidade</label>
          <input type="number" min="1" value={novaSala.capacidade} onChange={(e) => setNovaSala({ ...novaSala, capacidade: e.target.value })} />
        </div>
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label>Cor</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {CORES.map((cor) => (
              <button
                key={cor}
                type="button"
                onClick={() => setNovaSala({ ...novaSala, cor })}
                style={{
                  width: 28, height: 28, borderRadius: '50%', background: cor, cursor: 'pointer',
                  border: novaSala.cor === cor ? '2px solid var(--ink)' : '2px solid transparent',
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" className="btn btn-primary btn-sm" disabled={criando}>{criando ? 'Criando…' : 'Adicionar sala'}</button>
        </div>
      </form>
    </div>
  )
}

function SalaRow({ sala, onSalvar, onExcluir, excluindo }) {
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState(sala.nome)
  const [andar, setAndar] = useState(sala.andar ?? '')
  const [capacidade, setCapacidade] = useState(sala.capacidade ?? '')

  async function salvar() {
    await onSalvar({ nome, andar: andar || null, capacidade: capacidade ? Number(capacidade) : null })
    setEditando(false)
  }

  return (
    <tr>
      <td><span className="grade-column-dot" style={{ background: sala.cor, display: 'inline-block' }} /></td>
      <td>{editando ? <input value={nome} onChange={(e) => setNome(e.target.value)} /> : sala.nome}</td>
      <td>{editando ? <input value={andar} onChange={(e) => setAndar(e.target.value)} /> : (sala.andar || '—')}</td>
      <td className="num">{editando ? <input type="number" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} /> : (sala.capacidade ?? '—')}</td>
      <td>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={sala.ativa} onChange={(e) => onSalvar({ ativa: e.target.checked })} />
        </label>
        {editando ? (
          <button type="button" className="btn-link" style={{ marginLeft: 12 }} onClick={salvar}>Salvar</button>
        ) : (
          <button type="button" className="btn-link" style={{ marginLeft: 12 }} onClick={() => setEditando(true)}>Editar</button>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn-link"
          style={{ color: 'var(--danger)' }}
          disabled={excluindo}
          onClick={onExcluir}
        >
          Excluir
        </button>
      </td>
    </tr>
  )
}
