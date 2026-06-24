import { Canvas } from "@react-three/fiber"
import { Environment, Center } from "@react-three/drei"
import Board from "./Board"
import Backdrop from "./Backdrop"
import CameraRig from "./CameraRig"
import { Vector3 } from "three"
import ClickAreas from "./ClickAreas"

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: new Vector3(0, 0, 0), fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in">
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Board />
          <ClickAreas />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
