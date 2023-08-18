import { DIRECTIONS } from '$lib/models/cube3d'
import { cubeState } from '$lib/stores/cubeState'

// Convert directions object to array
const directions = Object.values(DIRECTIONS)

export function scramble(numMoves: number = 20) {
  let prevMoveIdx: number | null = null
  let moves = []
  for (let i = 0; i < numMoves; i++) {
    // 50% chance of a counter-clockwise move
    const isClockwise = Math.random() < 0.5
    // 50% chance of a double move (e.g. R2, U2, etc.)
    const isDouble = Math.random() < 0.5

    // Pick a random move, ensuring move is different from previous move
    let randomIndex: number
    do {
      randomIndex = Math.floor(Math.random() * directions.length)
    } while (randomIndex === prevMoveIdx)
    prevMoveIdx = randomIndex

    // Queue the move
    const randomAxis = directions[randomIndex]
    moves.push(randomAxis)
    // queueMove(randomAxis, isClockwise)
    cubeState.update((state) => {
      return state.moveFromAxis(randomAxis, isClockwise)
    })

    // If double move, queue the move again
    if (isDouble) {
      moves.push(randomAxis)
      // queueMove(randomAxis, isClockwise)
      cubeState.update((state) => {
        return state.moveFromAxis(randomAxis, isClockwise)
      })
    }
  }

}
