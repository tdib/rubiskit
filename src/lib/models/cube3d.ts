import { Vector3, Quaternion, Color } from 'three'
import { cube3dState, moveState } from '$lib/stores/cube3dState'

export const RED = new Color('#a61b1b')
export const BLUE = new Color('#1c52c7')
export const GREEN = new Color('#18a81c')
export const ORANGE = new Color('#c46b27')
export const YELLOW = new Color('#e8c723')
export const WHITE = new Color('#eeeeee')

type CubieColour = {
  right?: Color
  left?: Color
  up?: Color
  down?: Color
  front?: Color
  back?: Color
}

export type Cubie = {
  position: Vector3
  rotation: Quaternion
  globalRotation: Quaternion
  colour: CubieColour
}

export const DIRECTIONS = {
  UP: new Vector3(0, 1, 0),
  LEFT: new Vector3(-1, 0, 0),
  FRONT: new Vector3(0, 0, 1),
  RIGHT: new Vector3(1, 0, 0),
  BACK: new Vector3(0, 0, -1),
  DOWN: new Vector3(0, -1, 0),
} as const

function queueMove(move: Vector3, isClockwise: boolean = true) {
  moveState.update((state) => {
    state.moveQueue.push({ move: move, isClockwise: isClockwise })
    return { ...state }
  })
}

export class Cube3D {
  R() {
    queueMove(DIRECTIONS.RIGHT)
  }

  RPrime() {
    queueMove(DIRECTIONS.RIGHT, false)
  }
  
  U() {
    queueMove(DIRECTIONS.UP)
  }
  
  UPrime() {
    queueMove(DIRECTIONS.UP, false)
  }
  
  L() {
    queueMove(DIRECTIONS.LEFT)
  }
  
  LPrime() {
    queueMove(DIRECTIONS.LEFT, false)
  }
  
  F() {
    queueMove(DIRECTIONS.FRONT)
  }
  
  FPrime() {
    queueMove(DIRECTIONS.FRONT, false)
  }
  
  B() {
    queueMove(DIRECTIONS.BACK)
  }
  
  BPrime() {
    queueMove(DIRECTIONS.BACK, false)
  }
  
  D() {
    queueMove(DIRECTIONS.DOWN)
  }
  
  DPrime() {
    queueMove(DIRECTIONS.DOWN, false)
  }
  
  x() {
  }
  
  xPrime() {
  }
  
  y() {
  }
  
  yPrime() {
  }
  
  z() {
  }
  
  zPrime() {
  }
  
  // Advanced moves
  m() {
  }
  
  mPrime() {
  }
  
  e() {
  }
  
  ePrime() {
  }
  
  s() {
  }
  
  sPrime() {
  }
}