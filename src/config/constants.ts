import { swatch } from "../assets"
import state from "../store"
import { EulerOrder } from "three/src/math/Euler.js"

export interface TabElement {
  name: string
  icon: string
}

export type Tile = "_" | "X" | "O"

export const EditorTabs: TabElement[] = [
  {
    name: "colorpicker",
    icon: swatch,
  },
]

export const GridPositions: [x: number, y: number, z: number][] = [
  [-0.2, 0.2, 0],
  [0, 0.2, 0],
  [0.2, 0.2, 0],
  [-0.2, 0, 0],
  [0, 0, 0],
  [0.2, 0, 0],
  [-0.2, -0.2, 0],
  [0, -0.2, 0],
  [0.2, -0.2, 0],
]

export const WinConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

interface VictoryLineInfoType {
  position: [x: number, y: number, z: number]
  rotation: [x: number, y: number, z: number, order?: EulerOrder | undefined]
  length: number
}

export const VictoryLineInfo:VictoryLineInfoType[] = [
  { position: [0, 0.2, 0.03], rotation: [0, 0, Math.PI / 2], length: 0.5 },
  { position: [0, 0, 0.03], rotation: [0, 0, Math.PI / 2], length: 0.5 },
  { position: [0, -0.2, 0.03], rotation: [0, 0, Math.PI / 2], length: 0.5 },
  { position: [-0.2, 0, 0.03], rotation: [0, 0, 0], length: 0.5 },
  { position: [0, 0, 0.03], rotation: [0, 0, 0], length: 0.5 },
  { position: [0.2, 0, 0.03], rotation: [0, 0, 0], length: 0.5 },
  { position: [0, 0, 0.03], rotation: [0, 0, Math.PI / 4], length: 0.6 },
  { position: [0, 0, 0.03], rotation: [0, 0, -Math.PI / 4], length: 0.6 },
]

export const DefaultBoard: Tile[][] = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
]

export const resetBoard = () => {
  state.currentPlayer = "X"
  state.board = JSON.parse(JSON.stringify(DefaultBoard))
  state.blockInput = false
  state.gameComplete = false
  state.victoryLineIndex = -1
}
