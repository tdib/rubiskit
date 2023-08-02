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
type Row = [StickerColour, StickerColour, StickerColour]
export type Face = [Row, Row, Row]
type CubeState = [Face, Face, Face, Face, Face, Face]
const DIMENSION = 3
const NUM_FACES = 6

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
export type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS]

export class Cube {
    state: CubeState

    constructor(initial: CubeState = SOLVED_CUBE) {
        this.state = JSON.parse(JSON.stringify(initial))
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

        // The right face is rotated 90 degrees (clockwise)
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

        return this
    }

    LPrime() {

        return this
    }

    F() {

        return this
    }

    FPrime() {

        return this
    }

    B() {

        return this
    }

    BPrime() {
        return this
    }

    D() {

        return this
    }

    DPrime() {

        return this
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
