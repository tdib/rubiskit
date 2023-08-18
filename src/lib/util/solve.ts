import { cubeState } from '$lib/stores/cubeState'

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