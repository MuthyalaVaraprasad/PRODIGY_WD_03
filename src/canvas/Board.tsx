import { easing } from "maath"
import { useSnapshot } from "valtio"
import { useFrame } from "@react-three/fiber"
import state from "../store"
import { MeshPhongMaterial } from "three"
import O from "./O"
import X from "./X"
import { GridPositions, VictoryLineInfo } from "../config/constants"
import { motion } from "framer-motion-3d"
import { lineAnimation, tileAnimation } from "../config/motion"
import { useState, useEffect } from "react"
import Line from "./Line"

const Board = () => {
  const snap = useSnapshot(state)
  const stateString = JSON.stringify(snap)
  const boardMaterial = new MeshPhongMaterial({ color: snap.color })
  const [renderedComponents, setRenderedComponents] = useState<{
    [key: number]: boolean
  }>({})

  useFrame((_, delta) => {
    easing.dampC(boardMaterial.color, state.color, 0.25, delta)
  })

  useEffect(() => {
    const newRenderedComponents: typeof renderedComponents = {}
    snap.board.flat(1).forEach((sqr, i) => {
      newRenderedComponents[i] = sqr === "_"
    })
    setRenderedComponents(newRenderedComponents)
  }, [snap.board])

  return (
    <group key={stateString}>
      <mesh castShadow position={[0.1, 0, 0]} material={boardMaterial}>
        <boxGeometry args={[0.02, 0.6, 0.02]}></boxGeometry>
      </mesh>
      <mesh castShadow position={[-0.1, 0, 0]} material={boardMaterial}>
        <boxGeometry args={[0.02, 0.6, 0.02]}></boxGeometry>
      </mesh>
      <mesh
        castShadow
        position={[0, -0.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={boardMaterial}>
        <boxGeometry args={[0.02, 0.6, 0.02]}></boxGeometry>
      </mesh>
      <mesh
        castShadow
        position={[0, 0.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={boardMaterial}>
        <boxGeometry args={[0.02, 0.6, 0.02]}></boxGeometry>
      </mesh>
      {snap.board.flat(1).map(
        (sqr, i) =>
          sqr !== "_" && (
            <motion.mesh
              key={i}
              {...tileAnimation(
                renderedComponents[i],
                GridPositions[i],
                "random"
              )}>
              {sqr === "X" ? <X /> : <O />}
            </motion.mesh>
          )
      )}
      {snap.victoryLineIndex != -1 && (
        <motion.mesh
          {...lineAnimation(
            !snap.intro,
            VictoryLineInfo[snap.victoryLineIndex].position
          )}>
          <Line />
        </motion.mesh>
      )}
    </group>
  )
}

export default Board
