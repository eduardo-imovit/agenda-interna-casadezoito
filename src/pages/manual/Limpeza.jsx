import { ManualHeader, FuncaoCard, CorteOitoEMeia, ManualNav } from './componentes'
import { funcoes } from './dados'

export default function Limpeza() {
  return (
    <div>
      <ManualHeader
        titulo="Limpeza"
        sub="Subsolo e 1º andar sempre limpos, e apoio ao térreo antes da abertura"
      />

      <FuncaoCard funcao={funcoes.limpeza} />
      <CorteOitoEMeia />

      <ManualNav atual="limpeza" />
    </div>
  )
}
