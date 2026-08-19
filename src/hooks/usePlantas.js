import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { usePerfil } from './usePerfil'

const BUCKET = 'mapas'

/** Plantas (pisos) do prédio, uma imagem por piso, guardadas no Storage e listadas em public.plantas. */
export function usePlantas() {
  const { perfil, carregando: carregandoPerfil } = usePerfil()
  const empresaId = perfil?.empresa_id
  const [plantas, setPlantas] = useState([])
  const [carregando, setCarregando] = useState(true)

  const recarregar = useCallback(async () => {
    if (!empresaId) {
      setPlantas([])
      setCarregando(false)
      return
    }
    setCarregando(true)
    const { data, error } = await supabase.from('plantas').select('*').eq('empresa_id', empresaId).order('ordem')
    if (!error) setPlantas(data ?? [])
    setCarregando(false)
  }, [empresaId])

  useEffect(() => {
    if (!carregandoPerfil) recarregar()
  }, [carregandoPerfil, recarregar])

  async function criarPlanta({ nome, arquivo }) {
    if (!empresaId) throw new Error('Empresa não identificada.')

    const { data: planta, error: erroInsert } = await supabase
      .from('plantas')
      .insert({ empresa_id: empresaId, nome, ordem: plantas.length })
      .select()
      .single()
    if (erroInsert) throw erroInsert

    const extensao = arquivo.name.split('.').pop()
    const caminho = `${empresaId}/plantas/${planta.id}.${extensao}`
    const { error: erroUpload } = await supabase.storage.from(BUCKET).upload(caminho, arquivo, { upsert: true })
    if (erroUpload) throw erroUpload

    const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(caminho)
    const url = `${publicUrlData.publicUrl}?v=${Date.now()}`

    const { error: erroUpdate } = await supabase.from('plantas').update({ imagem_url: url }).eq('id', planta.id)
    if (erroUpdate) throw erroUpdate

    await recarregar()
  }

  async function renomearPlanta(id, nome) {
    const { error } = await supabase.from('plantas').update({ nome }).eq('id', id)
    if (error) throw error
    await recarregar()
  }

  /** Salas que estavam nesse piso ficam sem posição (planta_id vira null via FK on delete set null). */
  async function excluirPlanta(id) {
    const { error } = await supabase.from('plantas').delete().eq('id', id)
    if (error) throw error
    await recarregar()
  }

  return { plantas, carregando: carregando || carregandoPerfil, criarPlanta, renomearPlanta, excluirPlanta, recarregar }
}
