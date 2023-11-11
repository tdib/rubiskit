import { Vector3 } from 'three'
import type { Cubie } from '$lib/models/cube3d'

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
    // Determine which face the slice move is on
    if (rotationAxis.x === 0) {
      return cubie.position.x === 0
    } else if (rotationAxis.y === 0) {
      return cubie.position.y === 0
    } else if (rotationAxis.z === 0) {
      return cubie.position.z === 0
    }
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
