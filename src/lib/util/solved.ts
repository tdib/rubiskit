import { cube3dState, SOLVED_CUBE_STATE } from '$lib/stores/cube3dState'

export function isSolved(state: any, solvedState: any = SOLVED_CUBE_STATE) {
  let statePositions = state.cubies.map((cubie: any) => cubie.position)
  let solvedPositions = solvedState.map((cubie: any) => cubie.position)
  console.log(state.cubies.map((cubie: any) => cubie.rotation));

  return statePositions.every(
    (position: any, idx: number) => position.equals(solvedPositions[idx])
  )
}