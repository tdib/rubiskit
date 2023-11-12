import { Vector3, Quaternion, Color } from 'three'
import { moveState, rotationState } from '$lib/stores/cube3dState'

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
  colour: CubieColour
}

export const DIRECTIONS = {
  UP: new Vector3(0, 1, 0),
  LEFT: new Vector3(-1, 0, 0),
  FRONT: new Vector3(0, 0, 1),
  RIGHT: new Vector3(1, 0, 0),
  BACK: new Vector3(0, 0, -1),
  DOWN: new Vector3(0, -1, 0),
}

const ADVANCED_MOVES = {
  SLICE: new Vector3(1, 1, 0),
  EQUATOR: new Vector3(1, 0, 1),
  MIDDLE: new Vector3(0, 1, 1),
}

export function queueMove(move: Vector3, isClockwise: boolean = true) {
  moveState.update((state) => {
    state.moveQueue.push({ move, isClockwise })
    return { ...state }
  })
}

function queueRotation(axis: Vector3, isClockwise: boolean = true) {
  rotationState.update((state) => {
    state.rotationQueue.push({ axis, isClockwise })
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
    queueRotation(DIRECTIONS.RIGHT)
    
    // Get the relevant faces for this rotation
    let u = DIRECTIONS.UP
    let b = DIRECTIONS.BACK
    let d = DIRECTIONS.DOWN
    let f = DIRECTIONS.FRONT
    
    // Rotate the faces
    DIRECTIONS.UP = f
    DIRECTIONS.BACK = u
    DIRECTIONS.DOWN = b
    DIRECTIONS.FRONT = d
  }
  
  xPrime() {
    queueRotation(DIRECTIONS.RIGHT, false)
    
    // Get the relevant faces for this rotation
    let u = DIRECTIONS.UP
    let b = DIRECTIONS.BACK
    let d = DIRECTIONS.DOWN
    let f = DIRECTIONS.FRONT
    
    // Rotate the faces
    DIRECTIONS.UP = b
    DIRECTIONS.BACK = d
    DIRECTIONS.DOWN = f
    DIRECTIONS.FRONT = u
  }
  
  y() {
    queueRotation(DIRECTIONS.UP)
    
    // Get the relevant faces for this rotation
    let f = DIRECTIONS.FRONT
    let r = DIRECTIONS.RIGHT
    let b = DIRECTIONS.BACK
    let l = DIRECTIONS.LEFT
    
    // Rotate the faces
    DIRECTIONS.FRONT = r
    DIRECTIONS.RIGHT = b
    DIRECTIONS.BACK = l
    DIRECTIONS.LEFT = f
  }
  
  yPrime() {
    queueRotation(DIRECTIONS.UP, false)
    
    // Get the relevant faces for this rotation
    let f = DIRECTIONS.FRONT
    let r = DIRECTIONS.RIGHT
    let b = DIRECTIONS.BACK
    let l = DIRECTIONS.LEFT
    
    // Rotate the faces
    DIRECTIONS.FRONT = l
    DIRECTIONS.RIGHT = f
    DIRECTIONS.BACK = r
    DIRECTIONS.LEFT = b
  }
  
  z() {
    queueRotation(DIRECTIONS.FRONT)
    
    // Get the relevant faces for this rotation
    let u = DIRECTIONS.UP
    let l = DIRECTIONS.LEFT
    let d = DIRECTIONS.DOWN
    let r = DIRECTIONS.RIGHT
    
    // Rotate the faces
    DIRECTIONS.UP = l
    DIRECTIONS.LEFT = d
    DIRECTIONS.DOWN = r
    DIRECTIONS.RIGHT = u
  }
  
  zPrime() {
    queueRotation(DIRECTIONS.FRONT, false)
    
    // Get the relevant faces for this rotation
    let u = DIRECTIONS.UP
    let l = DIRECTIONS.LEFT
    let d = DIRECTIONS.DOWN
    let r = DIRECTIONS.RIGHT
    
    // Rotate the faces
    DIRECTIONS.UP = r
    DIRECTIONS.LEFT = u
    DIRECTIONS.DOWN = l
    DIRECTIONS.RIGHT = d
  }
  
  // Advanced moves
  m() {
    queueMove(ADVANCED_MOVES.MIDDLE, false)
  }
  
  mPrime() {
    queueMove(ADVANCED_MOVES.MIDDLE)
  }
  
  e() {
    queueMove(ADVANCED_MOVES.EQUATOR, false)
  }
  
  ePrime() {
    queueMove(ADVANCED_MOVES.EQUATOR)
  }
  
  s() {
    queueMove(ADVANCED_MOVES.SLICE)
  }
  
  sPrime() {
    queueMove(ADVANCED_MOVES.SLICE, false)
  }

  // Wide moves
  wideR() {
    this.R()
    this.mPrime()
  }
  
  wideRPrime() {
    this.RPrime()
    this.m()
  }
  
  wideU() {
    this.U()
    this.ePrime()
  }
  
  wideUPrime() {
    this.UPrime()
    this.e()
  }
  
  wideL() {
    this.L()
    this.m()
  }
  
  wideLPrime() {
    this.LPrime()
    this.mPrime()
  }
  
  wideF() {
    this.F()
    this.s()
  }
  
  wideFPrime() {
    this.FPrime()
    this.sPrime()
  }
  
  wideB() {
    this.B()
    this.sPrime()
  }
  
  wideBPrime() {
    this.BPrime()
    this.s()
  }
  
  wideD() {
    this.D()
    this.e()
  }
  
  wideDPrime() {
    this.DPrime()
    this.ePrime()
  }

}
