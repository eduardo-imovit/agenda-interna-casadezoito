import { ManualHeader, FuncaoCard, ManualNav } from './componentes'
import { funcoes } from './dados'

export default function Valet() {
  return (
    <div>
      <ManualHeader
        titulo="Valet & Segurança"
        sub="Chegada de veículos, fluxo de entregas e apoio à segurança da casa"
      />

      <FuncaoCard funcao={funcoes.valet} />

      <ManualNav atual="valet" />
    </div>
  )
}
