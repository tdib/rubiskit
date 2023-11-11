import { writable } from 'svelte/store'
import { Vector3, Quaternion } from 'three'
import { WHITE, GREEN, BLUE, RED, ORANGE, YELLOW, type Cubie } from '$lib/models/cube3d'

interface Camera {
  position: Vector3,
  rotation: Vector3,
}

export const cameraState = writable<Camera>({
  position: new Vector3(6, 6, 6),
  rotation: new Vector3(0, 0, 0),
})

export const moveState = writable<{
  moveQueue: { move: Vector3, isClockwise: boolean }[],
  isMoving: boolean
}>({
  moveQueue: [],
  isMoving: false,
})

export const rotationState = writable<{
  rotationQueue: { axis: Vector3, isClockwise: boolean }[],
  isRotating: boolean
}>({
  rotationQueue: [],
  isRotating: false
})

export const SOLVED_CUBE_STATE = [
  {
    position: new Vector3(1, 1, -1),
    rotation: new Quaternion(),
    colour: {
      up: WHITE,
      back: BLUE,
      right: RED,
    }
  },
  {
    position: new Vector3(0, 1, -1),
    rotation: new Quaternion(),
    colour: {
      up: WHITE,
      back: BLUE,
    }
  },
  {
    position: new Vector3(-1, 1, -1),
    rotation: new Quaternion(),
    colour: {
      up: WHITE,
      back: BLUE,
      left: ORANGE,
    }
  },
  {
    position: new Vector3(1, 0, -1),
    rotation: new Quaternion(),
    colour: {
      back: BLUE,
      right: RED,
    }
  },
  {
    position: new Vector3(0, 0, -1),
    rotation: new Quaternion(),
    colour: {
      back: BLUE,
    }
  },
  {
    position: new Vector3(-1, 0, -1),
    rotation: new Quaternion(),
    colour: {
      back: BLUE,
      left: ORANGE,
    }
  },
  {
    position: new Vector3(1, -1, -1),
    rotation: new Quaternion(),
    colour: {
      back: BLUE,
      right: RED,
      down: YELLOW,
    }
  },
  {
    position: new Vector3(0, -1, -1),
    rotation: new Quaternion(),
    colour: {
      back: BLUE,
      down: YELLOW,
    }
  },
  {
    position: new Vector3(-1, -1, -1),
    rotation: new Quaternion(),
    colour: {
      back: BLUE,
      down: YELLOW,
      left: ORANGE,
    }
  },
  {
    position: new Vector3(1, -1, 0),
    rotation: new Quaternion(),
    colour: {
      right: RED,
      down: YELLOW,
    }
  },
  {
    position: new Vector3(0, -1, 0),
    rotation: new Quaternion(),
    colour: {
      down: YELLOW,
    }
  },
  {
    position: new Vector3(-1, -1, 0),
    rotation: new Quaternion(),
    colour: {
      down: YELLOW,
      left: ORANGE,
    }
  },
  {
    position: new Vector3(1, 0, 0),
    rotation: new Quaternion(),
    colour: {
      right: RED,
    }
  },
  {
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(),
    colour: {}
  },
  {
    position: new Vector3(-1, 0, 0),
    rotation: new Quaternion(),
    colour: {
      left: ORANGE,
    }
  },
  {
    position: new Vector3(-1, 1, 0),
    rotation: new Quaternion(),
    colour: {
      up: WHITE,
      left: ORANGE,
    }
  },
  {
    position: new Vector3(0, 1, 0),
    rotation: new Quaternion(),
    colour: {
      up: WHITE,
    }
  },
  {
    position: new Vector3(1, 1, 0),
    rotation: new Quaternion(),
    colour: {
      up: WHITE,
      right: RED,
    }
  },
  {
    position: new Vector3(1, 1, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      up: WHITE,
      right: RED,
    }
  },
  {
    position: new Vector3(0, 1, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      up: WHITE,
    }
  },
  {
    position: new Vector3(-1, 1, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      up: WHITE,
      left: ORANGE,
    }
  },
  {
    position: new Vector3(1, 0, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      right: RED
    }
  },
  {
    position: new Vector3(0, 0, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
    }
  },
  {
    position: new Vector3(-1, 0, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      left: ORANGE,
    }
  },
  {
    position: new Vector3(1, -1, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      right: RED,
      down: YELLOW,
    }
  },
  {
    position: new Vector3(0, -1, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      down: YELLOW,
    }
  },
  {
    position: new Vector3(-1, -1, 1),
    rotation: new Quaternion(),
    colour: {
      front: GREEN,
      left: ORANGE,
      down: YELLOW,
    }
  },
] as const

export const cube3dState = writable<{ cubies: Cubie[], rotation: Vector3 }>({
  cubies: [...SOLVED_CUBE_STATE],
  rotation: new Vector3(0, 0, 0)
})