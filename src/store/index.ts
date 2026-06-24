import { proxy } from "valtio"
import { DefaultBoard } from "../config/constants"

type StateType = {
  intro: boolean
  gameComplete: boolean
  color: string
  gameMode: "human" | "ai"
  board: typeof DefaultBoard
  currentPlayer: "X" | "O"
  blockInput: boolean
  victoryLineIndex: number
}

const state = proxy<StateType>({
  intro: true,
  gameComplete: false,
  color: "#EFBD48",
  gameMode: "ai",
  board: JSON.parse(JSON.stringify(DefaultBoard)),
  currentPlayer: "X",
  blockInput: false,
  victoryLineIndex: -1,
})

export default state
