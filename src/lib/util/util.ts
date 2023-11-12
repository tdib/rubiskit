import { Vector3 } from 'three'
import type { Cubie } from '$lib/models/cube3d'
import { SLICE_MOVES, DIRECTIONS, SliceMove } from '$lib/models/cube3d'

/**
 * Round the x, y, and z components of a vector to the nearest integers. Used to account
 * for precision error when rotating cubies.
 * 
 * @param vector The vector to round
 * @returns A vector with rounded x, y, and z components
 */
export function roundVectorComponents(vector: Vector3): Vector3 {
  vector.x = Math.round(vector.x)
  vector.y = Math.round(vector.y)
  vector.z = Math.round(vector.z)

  return vector
}

/**
 * Checks if a cubie is on the target face of a rotation. Rotation axis  This function will also
 * return true if the cubie is on the target face of a slice move.
 * 
 * @param cubie The cubie to check
 * @param rotationAxis The axis of rotation. For regular moves, this should be represented
 * as (0, 1, 0), where 1 is the axis of rotation (i.e. rotate about the y axis). Slice moves
 * should be represented as (1, 1, 0), where 0 is the axis of rotation (i.e. rotate about the
 * z axis).
 * 
 * @returns True if the cubie is on that face, false otherwise
 */
export function isCubieOnTargetFace(cubie: Cubie, rotationAxis: Vector3): boolean {
  // If the rotation axis only has one zero, it indicates a slice move - handle accordingly
  if (hasOneZero(rotationAxis)) {
    // If we are dealing with a slice move, we have to map it to a regular
    // encoding, considering the relative rotation of the cubie (i.e. not just world space)
    rotationAxis = flipVector(mapAbsoluteToRelative(rotationAxis))

    // Determine which axis the slice move is on, and check if the current cubie is on this axis
    if (rotationAxis.x === 0) return cubie.position.x === 0
    if (rotationAxis.y === 0) return cubie.position.y === 0
    if (rotationAxis.z === 0) return cubie.position.z === 0
  }

  // A regular move is being performed - check if the cubie is on the target face
  if (rotationAxis.x) return cubie.position.x === rotationAxis.x
  if (rotationAxis.y) return cubie.position.y === rotationAxis.y
  if (rotationAxis.z) return cubie.position.z === rotationAxis.z

  return false
}

/**
 * Determine whether a vector's components only contain one zero.
 * Used for determining whether a rotation is a slice move.
 * 
 * @param vector Vector to check
 * @returns True if the vector has one component equal to 0, false otherwise
 */
export function hasOneZero(vector: Vector3): Boolean {
  let zeros = 0
  if (vector.x === 0) zeros++
  if (vector.y === 0) zeros++
  if (vector.z === 0) zeros++

  return zeros === 1
}

/**
 * Flip a vector's components from 0 to 1 and vice versa. Used
 * for converting slice moves to regular moves.
 * 
 * @param vector The vector to flip
 * @returns A vector with all 0 elements flipped to 1, and vice versa
 */
export function flipVector(vector: Vector3): Vector3 {
  const flip: { [key: number]: number } = {
    0: 1,
    1: 0,
  }
  return new Vector3(flip[vector.x], flip[vector.y], flip[vector.z])
}

/**
 * Convert a vector to a string for comparison purposes.
 * 
 * @param vector The vector to convert
 * @returns A string representation of the vector in the format 'x,y,z'
 */
function vecToString(vector: Vector3): string {
  return [vector.x, vector.y, vector.z].toString()
}

/**
 * Map an absolute vector axis to a relative vector. This is used to convert
 * slice moves to regular moves. For example, an absolute slice move on the z-axis is
 * represented as (1, 1, 0), and is converted to the axis corresponding to the front
 * of the cube, depending on how it is rotated.
 * 
 * 
 * @param vector An absolute vector in the slice encoding, formatted as (1, 1, 0),
 * where 0 is the axis of rotation.
 * @returns A relative vector, representing the axis of rotation for the slice move.
 */
export function mapAbsoluteToRelative(vector: Vector3): Vector3 {
  const v = [vector.x, vector.y, vector.z]

  // Slice moves are always on the axis of the front face
  if (v.toString() === vecToString(SLICE_MOVES[SliceMove.STANDING])) return DIRECTIONS.FRONT

  // Middle moves are always on the axis of the left face
  if (v.toString() === vecToString(SLICE_MOVES[SliceMove.MIDDLE])) return DIRECTIONS.LEFT

  // Equator moves are always on the axis of the down face
  if (v.toString() === vecToString(SLICE_MOVES[SliceMove.EQUATOR])) return DIRECTIONS.DOWN

  return vector
}