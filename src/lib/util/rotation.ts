import { Vector3, Quaternion, Matrix4 } from 'three'
import { cameraState, rotationState } from '$lib/stores/cube3dState'
import { DIRECTIONS } from '$lib/models/cube3d'
import { roundVectorComponents } from './permutation'

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

export function rotate(
  axis: Vector3, 
  isClockwise: boolean = true,
  rotationDuration: number = 0.2
) {
  axis = isClockwise ? axis : negateAxis(axis)

  let cameraPosition: Vector3 = new Vector3(6, 6, 6)
  let upVector: Vector3 = new Vector3(0, 1, 0)
  cameraState.subscribe((state) => {
    cameraPosition = state.position
    upVector = state.up
  })
  
  const startPosition = cameraPosition
  const endPosition = rotatePosition(startPosition, axis)

  const origin = new Vector3(0, 0, 0)
  const startQuaternion = new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(startPosition, origin, axis))
  const endQuaternion = new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(endPosition, origin, axis))
  
  const startUpQuaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), upVector)
  const endUpQuaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), DIRECTIONS.UP)
  
  let startTime: number | null = null
  function animateRotationFrame(timestamp: number) {
    if (startTime === null) {
      startTime = timestamp
    }
    const elapsedTime = (timestamp - startTime) / 1000
    
    if (elapsedTime < rotationDuration) {
      const currentQuaternion = new Quaternion()
      currentQuaternion.slerpQuaternions(startQuaternion, endQuaternion, elapsedTime / rotationDuration)
      
      const direction = new Vector3(0, 0, 1).applyQuaternion(currentQuaternion)
      cameraState.update((state) => {
        return {
          ...state,
          position: direction.multiplyScalar(startPosition.length())
        }
      })
      
      const currentUpQuaternion = new Quaternion()
      currentUpQuaternion.slerpQuaternions(startUpQuaternion, endUpQuaternion, elapsedTime / rotationDuration)
      
      const currentUpVector = new Vector3(0, 1, 0).applyQuaternion(currentUpQuaternion)
      cameraState.update((state) => {
        return {
          ...state,
          up: currentUpVector
        }
      })

      requestAnimationFrame(animateRotationFrame)
    } else {
      cameraState.update((state) => {
        return {
          position: endPosition,
          up: roundVectorComponents(upVector)
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