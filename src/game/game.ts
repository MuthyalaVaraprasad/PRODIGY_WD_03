import state from "../store"
import { delayFunction } from "../utils/utils"
import { WinConditions } from "../config/constants"

type Tile = "X" | "O" | "_"
type Board = Tile[]

const huPlayer: Tile = "X"
const aiPlayer: Tile = "O"

export function makeMove(index: number) {
  // update the board state and UI
  state.board[Math.floor(index / 3)][index % 3] = state.currentPlayer
//   console.log(state.board.toString())

  // make copy of updated board
  const boardCopy = JSON.parse(JSON.stringify(state.board))

  // check win
  const isWin = checkWin(boardCopy.flat(1), state.currentPlayer)
  const isDraw = !isWin && checkFullBoard(boardCopy.flat(1))
  if (isDraw) {
    // console.log("DRAW")
    state.blockInput = true
    return
  }

  if (isWin) {
    // win: show victory and block input
    state.blockInput = true

    delayFunction(500, () => {
      state.victoryLineIndex = getWinIndex(
        boardCopy.flat(1),
        state.currentPlayer
      )
    })
    // console.log(`VITCOTRYYYY TO ${state.currentPlayer}`)
    return
  }
  state.currentPlayer = state.currentPlayer === "X" ? "O" : "X"

  // no win:
  if (
    state.gameMode === "human" ||
    (state.gameMode === "ai" && state.currentPlayer === huPlayer)
  ) {
    // if Human's turn do jack shit
    return
  }
  // block human input
  state.blockInput = true
  // if AI delay a bit then make best move:
  delayFunction(750, () => makeBestMove(boardCopy.flat(1)))
}

function getWinIndex(board: Board, tile: Tile): number {
  const winningIndex = WinConditions.findIndex((condition) =>
    condition.every((index) => board[index] === tile)
  )
  return winningIndex !== -1 ? winningIndex : -1
}

function checkWin(board: Board, tile: Tile): boolean {
  return WinConditions.some((condition) =>
    condition.every((index) => board[index] === tile)
  )
}

function checkFullBoard(board: Board) {
  return board.every((tile) => tile !== "_")
}

function emptyIndexes(board: Board): number[] {
  return board
    .map((value, index) => (value === "_" ? index : -1))
    .filter((index) => index !== -1)
}

// returns the best move given a board
function makeBestMove(board: Board): void {
  let bestVal = -Infinity
  let bestMove = -1
  const availableSpots = emptyIndexes(board)

  for (const spot of availableSpots) {
    const newBoard = [...board]
    newBoard[spot] = aiPlayer
    const moveVal = minimax(newBoard, huPlayer, -Infinity, Infinity)

    if (moveVal > bestVal) {
      bestVal = moveVal
      bestMove = spot
    }
  }

  // unblocks human input
  state.blockInput = false
//   console.log(`BEST MOVE: ${bestMove}`)
  makeMove(bestMove)
}

function minimax(
  board: Board,
  tile: Tile,
  alpha: number,
  beta: number
): number {
  const availableSpots = emptyIndexes(board)

  // Check for a terminal state (win, lose, or draw)
  if (checkWin(board, huPlayer)) {
    return -10
  } else if (checkWin(board, aiPlayer)) {
    return 10
  } else if (availableSpots.length === 0) {
    return 0
  }

  let value: number

  if (tile === aiPlayer) {
    value = -Infinity
    for (const spot of availableSpots) {
      const newBoard = [...board]
      newBoard[spot] = aiPlayer
      const newVal = minimax(newBoard, huPlayer, alpha, beta)
      value = Math.max(value, newVal)
      alpha = Math.max(alpha, value)
      if (alpha >= beta) {
        break
      }
    }
  } else {
    value = Infinity
    for (const spot of availableSpots) {
      const newBoard = [...board]
      newBoard[spot] = huPlayer
      const newVal = minimax(newBoard, aiPlayer, alpha, beta)
      value = Math.min(value, newVal)
      beta = Math.min(beta, value)
      if (beta <= alpha) {
        break
      }
    }
  }

  return value
}
