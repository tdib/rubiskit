import { Cube2D } from './cube2d'
import { Cube3D } from './cube3d'
import type { Vector3 } from 'three'

export class CubeWrapper {
  cube2d: Cube2D
  cube3d: Cube3D
  history: Function[]

  constructor() {
    this.cube2d = new Cube2D()
    this.cube3d = new Cube3D()
    this.history = []
  }

  /**
   * Call the move function associated with the given axis. For example, if (0, 1, 0) is passed in
   * as the axis, then the U() function is called. This is useful for translating 3D vector axes
   * into 2D moves.
   * 
   * @param axis A vector representing the axis to move from
   * @param isClockwise A boolean determining whether or not the turn is clockwise (i.e. regular or a prime move)
   * @returns The CubeWrapper instance, having executed the move
   */
  moveFromAxis(axis: Vector3, isClockwise: boolean = true) {
    let {x, y, z} = axis

    x = Math.round(x)
    y = Math.round(y)
    z = Math.round(z)

    if (x === -1) {
      isClockwise ? this.L() : this.LPrime()
    } else if (x === 1) {
      isClockwise ? this.R() : this.RPrime()
    } else if (y === -1) {
      isClockwise ? this.D() : this.DPrime()
    } else if (y === 1) {
      isClockwise ? this.U() : this.UPrime()
    } else if (z === -1) {
      isClockwise ? this.B() : this.BPrime()
    } else if (z === 1) {
      isClockwise ? this.F() : this.FPrime()
    }

    return this
  }

  /**
   * Return the inversion of a move, given a move function. For example, if the
   * R() function is passed in, then the RPrime() function is returned.
   * 
   * @param move The move function to invert
   * @returns The inverted move function
   */
  invertMove(move: Function) {
    let invertedMap = new WeakMap()
    const methods = ['R', 'U', 'L', 'F', 'B', 'D', 'x', 'y', 'z', 'm', 'e', 's'];

    methods.forEach((method) => {
      const original = (this as any)[method]
      const inverted = (this as any)[`${method}Prime`]

      invertedMap.set(original, inverted.bind(this))
      invertedMap.set(inverted, original.bind(this))
    })

    return invertedMap.get(move)
  }

  R() {
    this.cube2d.R()
    this.cube3d.R()
    this.history.push(this.R)
  }
  
  RPrime() {
    this.cube2d.RPrime()
    this.cube3d.RPrime()
    this.history.push(this.RPrime)
  }
  
  U() {
    this.cube2d.U()
    this.cube3d.U()
    this.history.push(this.U)
  }
  
  UPrime() {
    this.cube2d.UPrime()
    this.cube3d.UPrime()
    this.history.push(this.UPrime)

  }
  
  L() {
    this.cube2d.L()
    this.cube3d.L()
    this.history.push(this.L)
  }
  
  LPrime() {
    this.cube2d.LPrime()
    this.cube3d.LPrime()
    this.history.push(this.LPrime)
  }
  
  F() {
    this.cube2d.F()
    this.cube3d.F()
    this.history.push(this.F)
  }
  
  FPrime() {
    this.cube2d.FPrime()
    this.cube3d.FPrime()
    this.history.push(this.FPrime)
  }
  
  B() {
    this.cube2d.B()
    this.cube3d.B()
    this.history.push(this.B)
  }
  
  BPrime() {
    this.cube2d.BPrime()
    this.cube3d.BPrime()
    this.history.push(this.BPrime)
  }
  
  D() {
    this.cube2d.D()
    this.cube3d.D()
    this.history.push(this.D)
  }
  
  DPrime() {
    this.cube2d.DPrime()
    this.cube3d.DPrime()
    this.history.push(this.DPrime)
  }
  
  x() {
    this.cube2d.x()
    this.cube3d.x()
    this.history.push(this.x)
  }

  xPrime() {
    this.cube2d.xPrime()
    this.cube3d.xPrime()
    this.history.push(this.xPrime)
  }

  y() {
    this.cube2d.y()
    this.cube3d.y()
    this.history.push(this.y)
  }

  yPrime() {
    this.cube2d.yPrime()
    this.cube3d.yPrime()
    this.history.push(this.yPrime)
  }

  z() {
    this.cube2d.z()
    this.cube3d.z()
    this.history.push(this.z)
  }

  zPrime() {
    this.cube2d.zPrime()
    this.cube3d.zPrime()
    this.history.push(this.zPrime)
  }
  
  // Slice moves
  m() {
    this.cube2d.m()
    this.cube3d.m()
    this.history.push(this.m)
  }
  
  mPrime() {
    this.cube2d.mPrime()
    this.cube3d.mPrime()
    this.history.push(this.mPrime)
  }
  
  e() {
    this.cube2d.e()
    this.cube3d.e()
    this.history.push(this.e)
  }
  
  ePrime() {
    this.cube2d.ePrime()
    this.cube3d.ePrime()
    this.history.push(this.ePrime)
  }
  
  s() {
    this.cube2d.s()
    this.cube3d.s()
    this.history.push(this.s)
  }
  
  sPrime() {
    this.cube2d.sPrime()
    this.cube3d.sPrime()
    this.history.push(this.sPrime)
  }

  // Wide moves
  wideR() {
    this.cube2d.wideR()
    this.cube3d.wideR()
    this.history.push(this.wideR)
  }
  
  wideRPrime() {
    this.cube2d.wideRPrime();
    this.cube3d.wideRPrime();
    this.history.push(this.wideRPrime);
  }
  
  wideU() {
    this.cube2d.wideU();
    this.cube3d.wideU();
    this.history.push(this.wideU);
  }
  
  wideUPrime() {
    this.cube2d.wideUPrime();
    this.cube3d.wideUPrime();
    this.history.push(this.wideUPrime);
  }
  
  wideL() {
    this.cube2d.wideL();
    this.cube3d.wideL();
    this.history.push(this.wideL);
  }
  
  wideLPrime() {
    this.cube2d.wideLPrime();
    this.cube3d.wideLPrime();
    this.history.push(this.wideLPrime);
  }
  
  wideF() {
    this.cube2d.wideF();
    this.cube3d.wideF();
    this.history.push(this.wideF);
  }
  
  wideFPrime() {
    this.cube2d.wideFPrime();
    this.cube3d.wideFPrime();
    this.history.push(this.wideFPrime);
  }
  
  wideB() {
    this.cube2d.wideB();
    this.cube3d.wideB();
    this.history.push(this.wideB);
  }
  
  wideBPrime() {
    this.cube2d.wideBPrime();
    this.cube3d.wideBPrime();
    this.history.push(this.wideBPrime);
  }
  
  wideD() {
    this.cube2d.wideD();
    this.cube3d.wideD();
    this.history.push(this.wideD);
  }
  
  wideDPrime() {
    this.cube2d.wideDPrime();
    this.cube3d.wideDPrime();
    this.history.push(this.wideDPrime);
  }
}