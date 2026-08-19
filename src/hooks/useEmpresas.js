import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useEmpresas() {
  const [empresas, setEmpresas] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    let ativo = true
    supabase
      .from('empresas')
      .select('id, nome')
      .order('nome')
      .then(({ data, error }) => {
        if (!ativo) return
        if (!error) setEmpresas(data ?? [])
        setCarregando(false)
      })
    return () => { ativo = false }
  }, [])

  return { empresas, carregando }
}
