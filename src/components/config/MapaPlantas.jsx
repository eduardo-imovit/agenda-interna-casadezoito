import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlantas } from '../../hooks/usePlantas'
import { useSalas } from '../../hooks/useSalas'

const LIMIAR_ARRASTO = 4 // px — abaixo disso um mousedown+mouseup conta como clique, não arrasto

export default function MapaPlantas({ ehAdmin }) {
  const navigate = useNavigate()
  const { plantas, carregando: carregandoPlantas, criarPlanta, renomearPlanta, excluirPlanta } = usePlantas()
  const { salas, atualizarSala } = useSalas({ somenteAtivas: false })

  const [plantaId, setPlantaId] = useState(null)
  const [editando, setEditando] = useState(false)
  const [salaParaPosicionar, setSalaParaPosicionar] = useState('')
  const [formNovoPiso, setFormNovoPiso] = useState(false)
  const [nomeNovoPiso, setNomeNovoPiso] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState(null)
  const [visivel, setVisivel] = useState(true)
  const [posicaoArrasto, setPosicaoArrasto] = useState(null) // { salaId, x, y } — só enquanto arrasta

  const wrapperRef = useRef(null)
  const arrasto = useRef(null)

  useEffect(() => {
    if (!plantaId && plantas.length > 0) setPlantaId(plantas[0].id)
  }, [plantas, plantaId])

  useEffect(() => {
    setVisivel(false)
    const t = setTimeout(() => setVisivel(true), 20)
    return () => clearTimeout(t)
  }, [plantaId])

  const plantaAtual = plantas.find((p) => p.id === plantaId) ?? null
  const marcadores = plantaAtual ? salas.filter((s) => s.planta_id === plantaAtual.id && s.pos_x != null && s.pos_y != null) : []
  const salasAtivas = salas.filter((s) => s.ativa)

  function coordsDoEvento(e) {
    const rect = wrapperRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    return { x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) }
  }

  async function handleCliqueNoMapa(e) {
    if (!editando || !salaParaPosicionar || !plantaAtual) return
    const { x, y } = coordsDoEvento(e)
    setMensagem(null)
    try {
      await atualizarSala(salaParaPosicionar, { planta_id: plantaAtual.id, pos_x: x, pos_y: y })
      setSalaParaPosicionar('')
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível posicionar a sala.' })
    }
  }

  function handlePointerDownMarcador(e, sala) {
    if (!editando) return
    e.stopPropagation()
    arrasto.current = { salaId: sala.id, startX: e.clientX, startY: e.clientY, moveu: false }
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  function handlePointerMove(e) {
    if (!arrasto.current) return
    const dx = e.clientX - arrasto.current.startX
    const dy = e.clientY - arrasto.current.startY
    if (Math.hypot(dx, dy) > LIMIAR_ARRASTO) arrasto.current.moveu = true
    if (arrasto.current.moveu) {
      const { x, y } = coordsDoEvento(e)
      setPosicaoArrasto({ salaId: arrasto.current.salaId, x, y })
    }
  }

  async function handlePointerUp(e) {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    const info = arrasto.current
    arrasto.current = null
    if (!info) return

    if (!info.moveu) {
      const sala = salas.find((s) => s.id === info.salaId)
      const confirmado = window.confirm(`Remover "${sala?.nome}" do mapa?`)
      if (!confirmado) return
      try {
        await atualizarSala(info.salaId, { planta_id: null, pos_x: null, pos_y: null })
      } catch {
        setMensagem({ tipo: 'erro', texto: 'Não foi possível remover a sala do mapa.' })
      }
      return
    }

    const { x, y } = coordsDoEvento(e)
    try {
      await atualizarSala(info.salaId, { pos_x: x, pos_y: y })
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível mover a sala.' })
    } finally {
      setPosicaoArrasto(null)
    }
  }

  async function handleCriarPiso(e) {
    e.preventDefault()
    const arquivo = e.target.elements.arquivo.files?.[0]
    if (!arquivo || !nomeNovoPiso.trim()) return
    setEnviando(true)
    setMensagem(null)
    try {
      await criarPlanta({ nome: nomeNovoPiso.trim(), arquivo })
      setNomeNovoPiso('')
      setFormNovoPiso(false)
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível enviar o piso. Tente uma imagem menor (JPG ou PNG).' })
    } finally {
      setEnviando(false)
    }
  }

  async function handleRenomearPiso(planta) {
    const nome = window.prompt('Nome do piso', planta.nome)
    if (!nome || !nome.trim() || nome.trim() === planta.nome) return
    try {
      await renomearPlanta(planta.id, nome.trim())
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível renomear o piso.' })
    }
  }

  async function handleExcluirPiso(planta) {
    const confirmado = window.confirm(`Excluir o piso "${planta.nome}"? As salas marcadas nele perdem a posição no mapa.`)
    if (!confirmado) return
    try {
      await excluirPlanta(planta.id)
      if (plantaId === planta.id) setPlantaId(null)
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Não foi possível excluir o piso.' })
    }
  }

  if (carregandoPlantas) return <div className="hub-loading">Carregando…</div>

  if (plantas.length === 0 && !ehAdmin) return null

  return (
    <div>
      {mensagem && (
        <div className="login-error" style={{ marginBottom: 'var(--space-3)' }}>
          {mensagem.texto}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div className="tabs">
          {plantas.map((p) => (
            <span key={p.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <button
                type="button"
                className={`tab${plantaId === p.id ? ' is-active' : ''}`}
                onClick={() => setPlantaId(p.id)}
              >
                {p.nome}
              </button>
              {editando && (
                <>
                  <button type="button" className="btn-link" style={{ fontSize: 'var(--text-xs)' }} onClick={() => handleRenomearPiso(p)}>✎</button>
                  <button type="button" className="btn-link" style={{ fontSize: 'var(--text-xs)', color: 'var(--danger)' }} onClick={() => handleExcluirPiso(p)}>✕</button>
                </>
              )}
            </span>
          ))}
          {editando && !formNovoPiso && (
            <button type="button" className="tab" onClick={() => setFormNovoPiso(true)}>+ Piso</button>
          )}
        </div>

        {ehAdmin && (
          <button type="button" className={`btn btn-sm ${editando ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setEditando((v) => !v)}>
            {editando ? 'Concluir edição' : 'Editar mapa'}
          </button>
        )}
      </div>

      {editando && formNovoPiso && (
        <form onSubmit={handleCriarPiso} className="card card-body" style={{ maxWidth: 480, marginTop: 'var(--space-3)', display: 'grid', gap: 'var(--space-3)' }}>
          <div className="field">
            <label>Nome do piso</label>
            <input required value={nomeNovoPiso} onChange={(e) => setNomeNovoPiso(e.target.value)} placeholder="Ex.: Térreo" />
          </div>
          <div className="field">
            <label>Imagem da planta</label>
            <input required type="file" name="arquivo" accept="image/*" />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button type="submit" className="btn btn-primary btn-sm" disabled={enviando}>{enviando ? 'Enviando…' : 'Salvar piso'}</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setFormNovoPiso(false); setNomeNovoPiso('') }}>Cancelar</button>
          </div>
        </form>
      )}

      {editando && !formNovoPiso && (
        <div className="field" style={{ maxWidth: 360, marginTop: 'var(--space-3)' }}>
          <label>Posicionar sala</label>
          <select value={salaParaPosicionar} onChange={(e) => setSalaParaPosicionar(e.target.value)}>
            <option value="">Selecione uma sala…</option>
            {salasAtivas.map((s) => {
              const posicionada = s.planta_id != null
              const pisoDela = posicionada ? plantas.find((p) => p.id === s.planta_id)?.nome : null
              return (
                <option key={s.id} value={s.id}>
                  {s.nome}{posicionada ? ` (em ${pisoDela ?? 'outro piso'})` : ''}
                </option>
              )
            })}
          </select>
          {salaParaPosicionar && <div className="stat-sub" style={{ marginTop: 4 }}>Clique no mapa pra posicionar essa sala.</div>}
        </div>
      )}

      {plantaAtual ? (
        <div
          ref={wrapperRef}
          onClick={handleCliqueNoMapa}
          style={{
            position: 'relative',
            width: '100%',
            marginTop: 'var(--space-4)',
            cursor: editando && salaParaPosicionar ? 'crosshair' : 'default',
          }}
        >
          <img
            src={plantaAtual.imagem_url}
            alt={`Mapa do piso ${plantaAtual.nome}`}
            draggable={false}
            style={{
              width: '100%',
              display: 'block',
              borderRadius: 'var(--radius-md)',
              userSelect: 'none',
              opacity: visivel ? 1 : 0,
              transform: visivel ? 'scale(1)' : 'scale(0.99)',
              transition: 'opacity 220ms ease-out, transform 220ms ease-out',
            }}
          />
          {marcadores.map((sala) => {
            const arrastandoEssa = posicaoArrasto?.salaId === sala.id
            const x = arrastandoEssa ? posicaoArrasto.x : sala.pos_x
            const y = arrastandoEssa ? posicaoArrasto.y : sala.pos_y
            return (
              <div
                key={sala.id}
                onPointerDown={(e) => handlePointerDownMarcador(e, sala)}
                onClick={() => { if (!editando) navigate(`/agenda?sala=${sala.id}&nova=1`) }}
                title={editando ? sala.nome : `Agendar em ${sala.nome}`}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '2px 8px 2px 2px',
                  borderRadius: 999,
                  background: 'var(--surface)',
                  border: `1px solid ${sala.cor}`,
                  boxShadow: 'var(--shadow-sm)',
                  cursor: editando ? 'grab' : 'pointer',
                  opacity: visivel ? 1 : 0,
                  transition: arrastandoEssa ? 'none' : 'opacity 220ms ease-out',
                  whiteSpace: 'nowrap',
                  zIndex: arrastandoEssa ? 2 : 1,
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: sala.cor, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>{sala.nome}</span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty" style={{ marginTop: 'var(--space-4)' }}>
          <div className="empty-title">Nenhum piso cadastrado</div>
          <div className="empty-sub">
            {ehAdmin ? 'Clique em "Editar mapa" e depois em "+ Piso" pra enviar a planta.' : 'Peça a um admin pra enviar a planta do prédio.'}
          </div>
        </div>
      )}
    </div>
  )
}
