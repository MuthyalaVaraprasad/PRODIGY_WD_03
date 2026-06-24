import React from "react"
import state from "../store"
import { useSnapshot } from "valtio"
import { VictoryLineInfo } from "../config/constants"

const Line = () => {
  const snap = useSnapshot(state)
  const thickness = 0.02
  const xMaterial = <meshStandardMaterial color={"#ffffff"} />
  const { rotation, length } = { ...VictoryLineInfo[snap.victoryLineIndex] }

  return (
    <mesh castShadow rotation={rotation}>
      {xMaterial}
      <boxGeometry args={[thickness, length, thickness]}></boxGeometry>
    </mesh>
  )
}

export default React.memo(Line)
