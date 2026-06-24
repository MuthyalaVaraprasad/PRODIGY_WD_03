import { GridPositions } from "../config/constants"
import { makeMove } from "../game/game"
import state from "../store"
import { useSnapshot } from "valtio"

const ClickAreas = () => {
  const len = 0.15
  const snap = useSnapshot(state)

  const handleClick = (index: number) => {
    // reject click if AI making move, at home page or tile occupied
    if (
      snap.blockInput ||
      snap.intro ||
      snap.board[Math.floor(index / 3)][index % 3] !== "_"
    ) {
      return
    }

    // CALL GAME LOGIC TO MAKE MOVE
    makeMove(index)
  }

  return (
    <group>
      {GridPositions.map((pos, i) => (
        <mesh
          key={i}
          visible={false}
          position={pos}
          onClick={() => handleClick(i)}>
          <boxGeometry args={[len, len, 0.02]}></boxGeometry>
        </mesh>
      ))}
    </group>
  )
}

export default ClickAreas
