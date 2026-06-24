import React from "react"

const X = () => {
  const length = 0.125
  const thickness = 0.02
  const xMaterial = <meshStandardMaterial color={"#000000"} />

  return (
    <group>
      <mesh castShadow rotation={[0, 0, Math.PI / 4]}>
        {xMaterial}
        <boxGeometry args={[thickness, length, thickness]}></boxGeometry>
      </mesh>
      <mesh castShadow rotation={[0, 0, -Math.PI / 4]}>
        {xMaterial}
        <boxGeometry args={[thickness, length, thickness]}></boxGeometry>
      </mesh>
    </group>
  )
}

export default React.memo(X)
