// Defines the colours of each side of the cube for when it is rendered on the page
export const COLOURS = {
    'W': 'white', // White
    'Y': '#ffda00', // Yellow
    'B': '#286ee3', // Blue
    'G': '#19bd24', // Green
    'R': '#df2020', // Red
    'O': '#ff8300' // Orange
} as const

// Define the general structure and type definitions
type StickerColour = 'W' | 'O' | 'G' | 'R' | 'B' | 'Y' // Letters define the colours of the cube
export type Face = StickerColour[][]
type CubeState = [Face, Face, Face, Face, Face, Face]
const DIMENSION = 3

// The cube state is given by the following. The structure of which is as follows:
// U/top face: [top row] [middle row] [bottom row]
// L/left face: [top row] [middle row] [bottom row]
// ...
const SOLVED_CUBE: CubeState = [
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']], // Up
    [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
]

// The directions below are used to index into the 3D cube state array (rather than using integers everywhere)
// Any changes made to the ordering of the cube state must be reflected here
export const DIRECTIONS = {
  UP: 0,
  LEFT: 1,
  FRONT: 2,
  RIGHT: 3,
  BACK: 4,
  DOWN: 5
} as const

export class Cube2D {
    state: CubeState

    constructor(initial: CubeState = SOLVED_CUBE) {
        this.state = structuredClone(initial)
    }

    R() {
        console.log('R')

        // The right face is rotated 90 degrees (clockwise)
        rotateClockwise(this.state[DIRECTIONS.RIGHT])

        // Get last column of rows that will be altered
        let col_f = this.state[DIRECTIONS.FRONT].map(row => row[DIMENSION-1])
        let col_u = this.state[DIRECTIONS.UP].map(row => row[DIMENSION-1])
        let col_b = this.state[DIRECTIONS.BACK].map(row => row[0])
        let col_d = this.state[DIRECTIONS.DOWN].map(row => row[DIMENSION-1])

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT].forEach((row, i) => row[DIMENSION - 1] = col_d[i])
        this.state[DIRECTIONS.UP].forEach((row, i) => row[DIMENSION - 1] = col_f[i])
        this.state[DIRECTIONS.BACK].forEach((row, i) => row[0] = col_u[DIMENSION - i - 1])
        this.state[DIRECTIONS.DOWN].forEach((row, i) => row[DIMENSION - 1] = col_b[DIMENSION - i - 1])

        return this
    }

    RPrime() {
        console.log('R\'')

        // The right face is rotated 90 degrees (counter-clockwise)
        rotateCounterClockwise(this.state[DIRECTIONS.RIGHT])

        // Get last column of rows that will be altered
        let col_f = this.state[DIRECTIONS.FRONT].map(row => row[DIMENSION-1])
        let col_u = this.state[DIRECTIONS.UP].map(row => row[DIMENSION-1])
        let col_b = this.state[DIRECTIONS.BACK].map(row => row[0])
        let col_d = this.state[DIRECTIONS.DOWN].map(row => row[DIMENSION-1])

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT].forEach((row, i) => row[DIMENSION - 1] = col_u[i])
        this.state[DIRECTIONS.UP].forEach((row, i) => row[DIMENSION - 1] = col_b[DIMENSION - i - 1])
        this.state[DIRECTIONS.BACK].forEach((row, i) => row[0] = col_d[DIMENSION - i - 1])
        this.state[DIRECTIONS.DOWN].forEach((row, i) => row[DIMENSION - 1] = col_f[i])

        return this
    }

    U() {
        console.log('U')

        // The right face is rotated 90 degrees (clockwise)
        rotateClockwise(this.state[DIRECTIONS.UP])

        // Get last column of rows that will be altered
        let row_f = this.state[DIRECTIONS.FRONT][0]
        let row_l = this.state[DIRECTIONS.LEFT][0]
        let row_b = this.state[DIRECTIONS.BACK][0]
        let row_r = this.state[DIRECTIONS.RIGHT][0]

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT][0] = row_r
        this.state[DIRECTIONS.LEFT][0] = row_f
        this.state[DIRECTIONS.BACK][0] = row_l
        this.state[DIRECTIONS.RIGHT][0] = row_b

        return this
    }

    UPrime() {
        console.log('U\'')

        // The right face is rotated 90 degrees (counter-clockwise)
        rotateCounterClockwise(this.state[DIRECTIONS.UP])

        // Get last column of rows that will be altered
        let row_f = this.state[DIRECTIONS.FRONT][0]
        let row_l = this.state[DIRECTIONS.LEFT][0]
        let row_b = this.state[DIRECTIONS.BACK][0]
        let row_r = this.state[DIRECTIONS.RIGHT][0]

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT][0] = row_l
        this.state[DIRECTIONS.LEFT][0] = row_b
        this.state[DIRECTIONS.BACK][0] = row_r
        this.state[DIRECTIONS.RIGHT][0] = row_f

        return this
    }

    L() {
        console.log('L')

        // The right face is rotated 90 degrees (clockwise)
        rotateClockwise(this.state[DIRECTIONS.LEFT])

        // Get last column of rows that will be altered
        let col_f = this.state[DIRECTIONS.FRONT].map(row => row[0])
        let col_u = this.state[DIRECTIONS.UP].map(row => row[0])
        let col_b = this.state[DIRECTIONS.BACK].map(row => row[DIMENSION - 1])
        let col_d = this.state[DIRECTIONS.DOWN].map(row => row[0])

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT].forEach((row, i) => row[0] = col_u[i])
        this.state[DIRECTIONS.UP].forEach((row, i) => row[0] = col_b[DIMENSION - i - 1])
        this.state[DIRECTIONS.BACK].forEach((row, i) => row[DIMENSION - 1] = col_d[DIMENSION - i - 1])
        this.state[DIRECTIONS.DOWN].forEach((row, i) => row[0] = col_f[i])

        return this
    }

    LPrime() {
        console.log('L\'')

        // The right face is rotated 90 degrees (counter-clockwise)
        rotateCounterClockwise(this.state[DIRECTIONS.LEFT])

        // Get last column of rows that will be altered
        let col_f = this.state[DIRECTIONS.FRONT].map(row => row[0])
        let col_u = this.state[DIRECTIONS.UP].map(row => row[0])
        let col_b = this.state[DIRECTIONS.BACK].map(row => row[DIMENSION - 1])
        let col_d = this.state[DIRECTIONS.DOWN].map(row => row[0])

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT].forEach((row, i) => row[0] = col_d[i])
        this.state[DIRECTIONS.UP].forEach((row, i) => row[0] = col_f[i])
        this.state[DIRECTIONS.BACK].forEach((row, i) => row[DIMENSION - 1] = col_u[DIMENSION - i - 1])
        this.state[DIRECTIONS.DOWN].forEach((row, i) => row[0] = col_b[DIMENSION - i - 1])

        return this
    }

    F() {
        console.log('F')

        // The right face is rotated 90 degrees (clockwise)
        rotateClockwise(this.state[DIRECTIONS.FRONT])

        // Get altered rows/columns
        let row_u = this.state[DIRECTIONS.UP][DIMENSION - 1]
        let col_r = this.state[DIRECTIONS.RIGHT].map(row => row[0])
        let row_d = this.state[DIRECTIONS.DOWN][0]
        let col_l = this.state[DIRECTIONS.LEFT].map(row => row[DIMENSION - 1])

        // Perform the column swaps
        this.state[DIRECTIONS.UP][DIMENSION - 1] = col_l.reverse()
        this.state[DIRECTIONS.RIGHT].forEach((row, i) => row[0] = row_u[i])
        this.state[DIRECTIONS.DOWN][0] = col_r.reverse()
        this.state[DIRECTIONS.LEFT].forEach((row, i) => row[DIMENSION - 1] = row_d[i])

        return this
    }

    FPrime() {
        console.log('F\'')

        // The right face is rotated 90 degrees (counter-clockwise)
        rotateCounterClockwise(this.state[DIRECTIONS.FRONT])

        // Get altered rows/columns
        let row_u = this.state[DIRECTIONS.UP][DIMENSION - 1]
        let col_r = this.state[DIRECTIONS.RIGHT].map(row => row[0])
        let row_d = this.state[DIRECTIONS.DOWN][0]
        let col_l = this.state[DIRECTIONS.LEFT].map(row => row[DIMENSION - 1])

        // Perform the column swaps
        this.state[DIRECTIONS.UP][DIMENSION - 1] = col_r
        this.state[DIRECTIONS.RIGHT].forEach((row, i) => row[0] = row_d[DIMENSION - i - 1])
        this.state[DIRECTIONS.DOWN][0] = col_l
        this.state[DIRECTIONS.LEFT].forEach((row, i) => row[DIMENSION - 1] = row_u[DIMENSION - i - 1])

        return this
    }

    B() {
        console.log('B')

        // The right face is rotated 90 degrees (clockwise)
        rotateClockwise(this.state[DIRECTIONS.BACK])

        // Get altered rows/columns
        let row_u = this.state[DIRECTIONS.UP][0]
        let col_r = this.state[DIRECTIONS.RIGHT].map(row => row[DIMENSION - 1])
        let row_d = this.state[DIRECTIONS.DOWN][DIMENSION - 1]
        let col_l = this.state[DIRECTIONS.LEFT].map(row => row[0])

        // Perform the column swaps
        this.state[DIRECTIONS.UP][0] = col_r
        this.state[DIRECTIONS.RIGHT].forEach((row, i) => row[DIMENSION - 1] = row_d[DIMENSION - i - 1])
        this.state[DIRECTIONS.DOWN][DIMENSION - 1] = col_l
        this.state[DIRECTIONS.LEFT].forEach((row, i) => row[0] = row_u[DIMENSION - i - 1])

        return this
    }

    BPrime() {
        console.log('B\'')

        // The right face is rotated 90 degrees (counter-clockwise)
        rotateCounterClockwise(this.state[DIRECTIONS.BACK])

        // Get altered rows/columns
        let row_u = this.state[DIRECTIONS.UP][0]
        let col_r = this.state[DIRECTIONS.RIGHT].map(row => row[DIMENSION - 1])
        let row_d = this.state[DIRECTIONS.DOWN][DIMENSION - 1]
        let col_l = this.state[DIRECTIONS.LEFT].map(row => row[0])

        // Perform the column swaps
        this.state[DIRECTIONS.UP][0] = col_l.reverse()
        this.state[DIRECTIONS.RIGHT].forEach((row, i) => row[DIMENSION - 1] = row_u[i])
        this.state[DIRECTIONS.DOWN][DIMENSION - 1] = col_r.reverse()
        this.state[DIRECTIONS.LEFT].forEach((row, i) => row[0] = row_d[i])

        return this
    }

    D() {
        console.log('D')

        // The right face is rotated 90 degrees (clockwise)
        rotateClockwise(this.state[DIRECTIONS.DOWN])

        // Get last column of rows that will be altered
        let row_f = this.state[DIRECTIONS.FRONT][DIMENSION - 1]
        let row_r = this.state[DIRECTIONS.RIGHT][DIMENSION - 1]
        let row_b = this.state[DIRECTIONS.BACK][DIMENSION - 1]
        let row_l = this.state[DIRECTIONS.LEFT][DIMENSION - 1]

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT][DIMENSION - 1] = row_l
        this.state[DIRECTIONS.RIGHT][DIMENSION - 1] = row_f
        this.state[DIRECTIONS.BACK][DIMENSION - 1] = row_r
        this.state[DIRECTIONS.LEFT][DIMENSION - 1] = row_b

        return this
    }

    DPrime() {
        console.log('D\'')

        // The right face is rotated 90 degrees (counter-clockwise)
        rotateCounterClockwise(this.state[DIRECTIONS.DOWN])

        // Get last column of rows that will be altered
        let row_f = this.state[DIRECTIONS.FRONT][DIMENSION - 1]
        let row_r = this.state[DIRECTIONS.RIGHT][DIMENSION - 1]
        let row_b = this.state[DIRECTIONS.BACK][DIMENSION - 1]
        let row_l = this.state[DIRECTIONS.LEFT][DIMENSION - 1]

        // Perform the column swaps
        this.state[DIRECTIONS.FRONT][DIMENSION - 1] = row_r
        this.state[DIRECTIONS.RIGHT][DIMENSION - 1] = row_b
        this.state[DIRECTIONS.BACK][DIMENSION - 1] = row_l
        this.state[DIRECTIONS.LEFT][DIMENSION - 1] = row_f


        return this
    }

    x() {
        // Rotate the faces that are not moving
        rotateClockwise(this.state[DIRECTIONS.RIGHT])
        rotateCounterClockwise(this.state[DIRECTIONS.LEFT])

        // Get the relevant faces for this rotation
        let u = this.state[DIRECTIONS.UP]
        let b = this.state[DIRECTIONS.BACK]
        let d = this.state[DIRECTIONS.DOWN]
        let f = this.state[DIRECTIONS.FRONT]
    
        // Rotate the faces
        this.state[DIRECTIONS.UP] = f
        this.state[DIRECTIONS.BACK] = rotateClockwise(rotateClockwise(u))
        this.state[DIRECTIONS.DOWN] = rotateClockwise(rotateClockwise(b))
        this.state[DIRECTIONS.FRONT] = d

        return this
    }

    xPrime() {
        // Rotate the faces that are not moving
        rotateClockwise(this.state[DIRECTIONS.LEFT])
        rotateCounterClockwise(this.state[DIRECTIONS.RIGHT])

        // Get the relevant faces for this rotation
        let u = this.state[DIRECTIONS.UP]
        let b = this.state[DIRECTIONS.BACK]
        let d = this.state[DIRECTIONS.DOWN]
        let f = this.state[DIRECTIONS.FRONT]
    
        // Rotate the faces
        this.state[DIRECTIONS.UP] = rotateClockwise(rotateClockwise(b))
        this.state[DIRECTIONS.BACK] = rotateClockwise(rotateClockwise(d))
        this.state[DIRECTIONS.DOWN] = f
        this.state[DIRECTIONS.FRONT] = u

        return this
    }

    y() {
        // Rotate the faces that are not moving
        rotateClockwise(this.state[DIRECTIONS.UP])
        rotateCounterClockwise(this.state[DIRECTIONS.DOWN])

        // Get the relevant faces for this rotation
        let f = this.state[DIRECTIONS.FRONT]
        let r = this.state[DIRECTIONS.RIGHT]
        let b = this.state[DIRECTIONS.BACK]
        let l = this.state[DIRECTIONS.LEFT]
    
        // Rotate the faces
        this.state[DIRECTIONS.FRONT] = r
        this.state[DIRECTIONS.RIGHT] = b
        this.state[DIRECTIONS.BACK] = l
        this.state[DIRECTIONS.LEFT] = f

        return this
    }

    yPrime() {
        // Rotate the faces that are not moving
        rotateClockwise(this.state[DIRECTIONS.DOWN])
        rotateCounterClockwise(this.state[DIRECTIONS.UP])

        // Get the relevant faces for this rotation
        let f = this.state[DIRECTIONS.FRONT]
        let r = this.state[DIRECTIONS.RIGHT]
        let b = this.state[DIRECTIONS.BACK]
        let l = this.state[DIRECTIONS.LEFT]
    
        // Rotate the faces
        this.state[DIRECTIONS.FRONT] = l
        this.state[DIRECTIONS.RIGHT] = f
        this.state[DIRECTIONS.BACK] = r
        this.state[DIRECTIONS.LEFT] = b

        return this
    }

    z() {
        // Rotate the faces that are not moving
        rotateClockwise(this.state[DIRECTIONS.FRONT])
        rotateCounterClockwise(this.state[DIRECTIONS.BACK])

        // Get the relevant faces for this rotation
        let u = this.state[DIRECTIONS.UP]
        let l = this.state[DIRECTIONS.LEFT]
        let d = this.state[DIRECTIONS.DOWN]
        let r = this.state[DIRECTIONS.RIGHT]
    
        // Rotate the faces
        this.state[DIRECTIONS.UP] = rotateClockwise(l)
        this.state[DIRECTIONS.LEFT] = rotateClockwise(d)
        this.state[DIRECTIONS.DOWN] = rotateClockwise(r)
        this.state[DIRECTIONS.RIGHT] = rotateClockwise(u)

        return this
    }

    zPrime() {
        // Rotate the faces that are not moving
        rotateClockwise(this.state[DIRECTIONS.BACK])
        rotateCounterClockwise(this.state[DIRECTIONS.FRONT])

        // Get the relevant faces for this rotation
        let u = this.state[DIRECTIONS.UP]
        let l = this.state[DIRECTIONS.LEFT]
        let d = this.state[DIRECTIONS.DOWN]
        let r = this.state[DIRECTIONS.RIGHT]
    
        // Rotate the faces
        this.state[DIRECTIONS.UP] = rotateCounterClockwise(r)
        this.state[DIRECTIONS.LEFT] = rotateCounterClockwise(u)
        this.state[DIRECTIONS.DOWN] = rotateCounterClockwise(l)
        this.state[DIRECTIONS.RIGHT] = rotateCounterClockwise(d)

        return this
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

// Given a face, rotate it 90 degrees clockwise
function rotateClockwise(face: Face) {
    let temp

    // Permutate the corners 90 degrees clockwise
    temp = face[0][0]
    face[0][0] = face[2][0]
    face[2][0] = face[2][2]
    face[2][2] = face[0][2]
    face[0][2] = temp

    // Permutate the edges 90 degrees clockwise
    temp = face[0][1]
    face[0][1] = face[1][0]
    face[1][0] = face[2][1]
    face[2][1] = face[1][2]
    face[1][2] = temp
   
    return face
}

// Given a face, rotate it 90 degrees counter-clockwise
function rotateCounterClockwise(face: Face) {
    let temp

    // Permute the corners 90 degrees counter-clockwise
    temp = face[0][0]
    face[0][0] = face[0][2]
    face[0][2] = face[2][2]
    face[2][2] = face[2][0]
    face[2][0] = temp

    // Permute the edges 90 degrees counter-clockwise
    temp = face[0][1]
    face[0][1] = face[1][2]
    face[1][2] = face[2][1]
    face[2][1] = face[1][0]
    face[1][0] = temp
   
    return face
}
