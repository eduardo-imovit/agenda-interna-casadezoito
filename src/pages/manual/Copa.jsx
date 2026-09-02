import { ManualHeader, FuncaoCard, CorteOitoEMeia, ManualNav } from './componentes'
import { funcoes } from './dados'

export default function Copa() {
  return (
    <div>
      <ManualHeader
        titulo="Copa"
        sub="Térreo pronto para receber e apoio às reuniões ao longo do dia"
      />

      <FuncaoCard funcao={funcoes.copa} />
      <CorteOitoEMeia />

      <ManualNav atual="copa" />
    </div>
  )
}
