import { Vector3, Quaternion, Color } from 'three'
import { cube3dState, moveState } from '$lib/stores/cube3dState'
import { animateCameraRotation } from '$lib/util/rotation'

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

const DIRECTIONS = {
  UP: new Vector3(0, 1, 0),
  LEFT: new Vector3(-1, 0, 0),
  FRONT: new Vector3(0, 0, 1),
  RIGHT: new Vector3(1, 0, 0),
  BACK: new Vector3(0, 0, -1),
  DOWN: new Vector3(0, -1, 0),
}

const AXIS = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
}

function negateAxis(axis: Vector3) {
  return new Vector3(-axis.x, -axis.y, -axis.z)
}

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
    animateCameraRotation(AXIS.x)

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
    animateCameraRotation(negateAxis(AXIS.x))

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
    animateCameraRotation(AXIS.y)

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
    animateCameraRotation(negateAxis(AXIS.y))
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
    animateCameraRotation(AXIS.z)
    
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
    animateCameraRotation(negateAxis(AXIS.z))

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
      this.R()
      this.LPrime()
      this.xPrime()
  }

  mPrime() {
      this.RPrime()
      this.L()
      this.x()
  }

  e() {
      this.U()
      this.DPrime()
      this.yPrime()
  }

  ePrime() {
      this.UPrime()
      this.D()
      this.y()
  }

  s() {
      this.FPrime()
      this.B()
      this.z()
  }

  sPrime() {
      this.F()
      this.BPrime()
      this.zPrime()
  }
}