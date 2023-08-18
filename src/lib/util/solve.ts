import { cubeState } from '$lib/stores/cubeState'
import { SOLVED_CUBE } from '$lib/models/cube2d'
import type { CubeState } from '$lib/models/cube2d'

/**
 * Naively solves the cube by iterating through the history and inverting each move.
 */
export function naiveSolve() {
  let history: Function[] = []
  cubeState.subscribe((state) => history = state.history)

  // Iterate each move in the history backwards (i.e. most recent to oldest),
  // convert each move, and execute it
  for (let i = history.length; i > 0; i--) {
    let invertedMove: Function = () => {}
    cubeState.subscribe((state) => invertedMove = state.invertMove(state.history[i - 1]))
    invertedMove()
  }

  // Clear the history
  cubeState.update((state) => {
    state.history = []
    return state
  })
}

/**
 * Checks if the cube is solved using the 2D cube state.
 * 
 * @returns true if the cube is solved, false otherwise
 */
export function isSolved() {
  let currState: CubeState | null = null
  cubeState.subscribe((state) => currState = state.cube2d.state)

  if (currState === null) return false

  // Iterate each face, row, and sticker of the current state and check if it matches the solved cube
  for (const [faceIdx, face] of currState.entries()) {
      for (const [rowIdx, row] of face.entries()) {
          for (const [stickerIdx, sticker] of row.entries()) {
              if (sticker !== SOLVED_CUBE[faceIdx][rowIdx][stickerIdx]) {
                return false
              }
          }
      }
  }

  console.log('The cube has been solved!');
  return true
}