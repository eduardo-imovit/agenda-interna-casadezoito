const dataFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' })
const diaSemanaFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', timeZone: 'America/Sao_Paulo' })
const horaFormatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' })

export function hojeISO() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })
}

/** Converte um timestamp com timezone (ex: campos timestamptz do Supabase) pro dia local de São Paulo. */
export function paraDataLocalISO(dataHoraISO) {
  return new Date(dataHoraISO).toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })
}

export function formatarDataLonga(date = new Date()) {
  const diaSemana = diaSemanaFormatter.format(date)
  const capitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
  return `${capitalizado}, ${dataFormatter.format(date)}`
}

export function formatarHora(dataHora) {
  if (!dataHora) return '--:--'
  return horaFormatter.format(new Date(dataHora))
}

export function diaAnterior(dataISO) {
  const d = new Date(`${dataISO}T12:00:00`)
  d.setDate(d.getDate() - 1)
  return d.toLocaleDateString('en-CA')
}

export function diaSeguinte(dataISO) {
  const d = new Date(`${dataISO}T12:00:00`)
  d.setDate(d.getDate() + 1)
  return d.toLocaleDateString('en-CA')
}
