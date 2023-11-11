import { Vector3, Quaternion, Matrix4, Euler } from 'three'
import { cameraState, rotationState } from '$lib/stores/cube3dState'
import { DIRECTIONS } from '$lib/models/cube3d'

/**
 * Compute the position of a point after rotating it around the origin
 * on a specified axis.
 * 
 * @param position The original position of the point
 * @param axis The axis to rotate around
 * @returns A position vector representing the new position of the point
 */
function rotatePosition(position: Vector3, axis: Vector3): Vector3 {
  let angle = Math.PI/2
  let origin = new Vector3(0, 0, 0)

  const translatedPosition = position.clone().sub(origin)
  
  const rotationMatrix = new Matrix4()
  rotationMatrix.makeRotationAxis(axis.normalize(), angle)
  const rotatedPosition = translatedPosition.applyMatrix4(rotationMatrix)
  rotatedPosition.add(origin)
  
  return rotatedPosition
}

function negateAxis(axis: Vector3) {
  return new Vector3(-axis.x, -axis.y, -axis.z)
}

/**
 * Compute which direction the up face will be positioned in
 * after rotating around a given axis.
 * 
 * @param rotationAxis Axis to want to rotate around
 * @returns The axis corresponding to the upwards direction after the
 * rotation around the given axis is complete.
 */
function getUpTransformation(rotationAxis: THREE.Vector3): THREE.Vector3 {
  if (rotationAxis.equals(DIRECTIONS.FRONT)) {
    return DIRECTIONS.RIGHT
  } else if (rotationAxis.equals(DIRECTIONS.BACK)) {
    return DIRECTIONS.LEFT
  } else if (rotationAxis.equals(DIRECTIONS.UP)) {
    return DIRECTIONS.UP
  } else if (rotationAxis.equals(DIRECTIONS.DOWN)) {
    return DIRECTIONS.UP
  } else if (rotationAxis.equals(DIRECTIONS.RIGHT)) {
    return DIRECTIONS.BACK
  } else if (rotationAxis.equals(DIRECTIONS.LEFT)) {
    return DIRECTIONS.FRONT
  }

  return rotationAxis
}

/**
 * Convert a quaternion to a vector.
 * 
 * @param quaternion The quaternion to convert
 * @returns A Vector3 representing the rotation of the quaternion
 */
const quaternionToVector = (quaternion: Quaternion): Vector3 =>
  new Vector3().setFromEuler(new Euler().setFromQuaternion(quaternion))

/**
 * Rotate the camera around a given axis.
 * 
 * @param axis A Vector3 representing the axis to rotate around
 * @param isClockwise A boolean representing whether the rotation is clockwise or not
 * @param rotationDuration The number of seconds the rotation should take
 */
export function rotateCamera(
  axis: Vector3, 
  isClockwise: boolean = true,
  rotationDuration: number = 0.2
) {
  axis = isClockwise ? axis : negateAxis(axis)

  let cameraPosition: Vector3 = new Vector3(6, 6, 6)
  cameraState.subscribe((state) => {
    cameraPosition = state.position
  })
  
  // TODO: should we be computing things with the last rotation in the queue to stop weird artifacts when holding a rotation?
  // Compute the position where the camera will start and end
  const startPosition = cameraPosition
  const endPosition = rotatePosition(startPosition, axis)

  // Compute the rotation of the camera at the start and end
  const origin = new Vector3(0, 0, 0)
  const startQuaternion = new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(startPosition, origin, getUpTransformation(axis)))
  const endQuaternion = new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(endPosition, origin, DIRECTIONS.UP))

  let startTime: number | null = null
  function animateRotationFrame(timestamp: number) {
    if (startTime === null) startTime = timestamp
    const elapsedTime = (timestamp - startTime) / 1000
    
    if (elapsedTime < rotationDuration) {
      // What is the current progress of our animation?
      const currentQuaternion = new Quaternion()
      currentQuaternion.slerpQuaternions(startQuaternion, endQuaternion, elapsedTime / rotationDuration)
      
      // Compute the current position along the spherical interpolation path
      // (0, 0, 1) is the axis pointing towards the camera
      let currentPosition = new Vector3(0, 0, 1)
      // Applying our current quaternion will place it at its current point along the arc
      currentPosition = currentPosition.applyQuaternion(currentQuaternion)
      // Multiplying by the length of the start position will place it at the correct distance from the origin
      currentPosition = currentPosition.multiplyScalar(startPosition.length())

      // Update our camera at this step in the animation
      cameraState.update((state) => {
        return {
          ...state,
          position: currentPosition,
          rotation: quaternionToVector(currentQuaternion)
        }
      })

      requestAnimationFrame(animateRotationFrame)
    } else {
      // Snap the camera to the end position and rotation
      cameraState.update(() => {
        return {
          position: endPosition,
          rotation: quaternionToVector(endQuaternion)
        }
      })

      rotationState.update((state) => {
        return {
          ...state,
          isRotating: false
        }
      })
    }
  }
  
  requestAnimationFrame(animateRotationFrame)
}