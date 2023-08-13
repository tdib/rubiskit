import * as THREE from 'three'

const RED = new THREE.Color('#a61b1b')
const BLUE = new THREE.Color('#1c52c7')
const GREEN = new THREE.Color('#18a81c')
const ORANGE = new THREE.Color('#c46b27')
const YELLOW = new THREE.Color('#e8c723')
const WHITE = new THREE.Color('#eeeeee')

type Colour = {
  right?: THREE.Color
  left?: THREE.Color
  up?: THREE.Color
  down?: THREE.Color
  front?: THREE.Color
  back?: THREE.Color
}

export type CubieType = {
  position: THREE.Vector3
  rotation: THREE.Quaternion
  globalRotation: THREE.Quaternion
  colour: Colour
}

export let cubies: CubieType[] = [
  {
    position: new THREE.Vector3(1, 1, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      up: WHITE,
      back: BLUE,
      right: RED,
    }
  },
  {
    position: new THREE.Vector3(0, 1, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      up: WHITE,
      back: BLUE,
    }
  },
  {
    position: new THREE.Vector3(-1, 1, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      up: WHITE,
      back: BLUE,
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(1, 0, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      back: BLUE,
      right: RED,
    }
  },
  {
    position: new THREE.Vector3(0, 0, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      back: BLUE,
    }
  },
  {
    position: new THREE.Vector3(-1, 0, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      back: BLUE,
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(1, -1, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      back: BLUE,
      right: RED,
      down: YELLOW,
    }
  },
  {
    position: new THREE.Vector3(0, -1, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      back: BLUE,
      down: YELLOW,
    }
  },
  {
    position: new THREE.Vector3(-1, -1, -1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      back: BLUE,
      down: YELLOW,
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(1, -1, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      right: RED,
      down: YELLOW,
    }
  },
  {
    position: new THREE.Vector3(0, -1, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      down: YELLOW,
    }
  },
  {
    position: new THREE.Vector3(-1, -1, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      down: YELLOW,
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(1, 0, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      right: RED,
    }
  },
  {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {}
  },
  {
    position: new THREE.Vector3(-1, 0, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(-1, 1, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      up: WHITE,
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(0, 1, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      up: WHITE,
    }
  },
  {
    position: new THREE.Vector3(1, 1, 0),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      up: WHITE,
      right: RED,
    }
  },
  {
    position: new THREE.Vector3(1, 1, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      up: WHITE,
      right: RED,
    }
  },
  {
    position: new THREE.Vector3(0, 1, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      up: WHITE,
    }
  },
  {
    position: new THREE.Vector3(-1, 1, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      up: WHITE,
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(1, 0, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      right: RED
    }
  },
  {
    position: new THREE.Vector3(0, 0, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
    }
  },
  {
    position: new THREE.Vector3(-1, 0, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      left: ORANGE,
    }
  },
  {
    position: new THREE.Vector3(1, -1, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      right: RED,
      down: YELLOW,
    }
  },
  {
    position: new THREE.Vector3(0, -1, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      down: YELLOW,
    }
  },
  {
    position: new THREE.Vector3(-1, -1, 1),
    rotation: new THREE.Quaternion(),
    globalRotation: new THREE.Quaternion(),
    colour: {
      front: GREEN,
      left: ORANGE,
      down: YELLOW,
    }
  },
]