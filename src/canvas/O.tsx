import React from "react"
import { Shape, Path, ExtrudeGeometry } from "three"

function O() {
  const outerRadius = 0.05
  const innerRadius = 0.03
  const height = 0.02

  const arcShape = new Shape()
  arcShape.moveTo(outerRadius * 2, outerRadius)
  arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false)

  const holePath = new Path()
  holePath.moveTo(outerRadius + innerRadius, outerRadius)
  holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true)
  arcShape.holes.push(holePath)

  const geometry = new ExtrudeGeometry(arcShape, {
    depth: height,
    bevelEnabled: false,
    steps: 1,
    curveSegments: 60,
  })
  geometry.center()

  return <mesh geometry={geometry}>
    <meshStandardMaterial color={'#000000'}/>
  </mesh>
}

export default React.memo(O)
