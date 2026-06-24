import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useSnapshot } from "valtio"
import state from "../store"
import { Group, Vector3 } from "three"

const CameraRig = ({ children }: any) => {
  const group = useRef<Group>(null!)
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 675

    // set the initial position of the model
    let targetPosition: Vector3 = new Vector3(-0.4, 0, 2)
    if (snap.intro) {
      if (isBreakPoint) targetPosition.set(0, 0.1, 2)
      if (isMobile) targetPosition.set(0, 0.2, 2.5)
    } else {
      if (isMobile) targetPosition.set(0, 0, 2.5)
      else targetPosition.set(0, 0, 2)
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the rotation of the camera
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 5, -state.pointer.x / 2.5, 0],
      0.25,
      delta
    )
  })

  return <group ref={group}>{children}</group>
}

export default CameraRig
