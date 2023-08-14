import type { Cubie } from '$lib/models/cube3d'
import type { Vector3 } from 'three'
import { Quaternion } from 'three'
import * as Utils from 'three/src/math/MathUtils'
import { cube3dState, moveState } from '$lib/stores/cube3dState'

// Function for rounding a vector to the nearest integer - used to account for precision error
export function roundVectorComponents(vector: THREE.Vector3): THREE.Vector3 {
  vector.x = Math.round(vector.x)
  vector.y = Math.round(vector.y)
  vector.z = Math.round(vector.z)

  return vector
}

// This function checks if the cubie's position aligns with the provided rotation axis
function isCubieOnTargetFace(cubie: Cubie, rotationAxis: Vector3): boolean {
    if (rotationAxis.x) return cubie.position.x === rotationAxis.x
    if (rotationAxis.y) return cubie.position.y === rotationAxis.y
    if (rotationAxis.z) return cubie.position.z === rotationAxis.z
    return false
}

export function turn(rotationAxis: Vector3, isClockwise: boolean = true, turnDuration: number = 0.15) {
  let startTime: number | null = null
  const ROTATION_DIRECTION_AMOUNT = isClockwise ? -Math.PI/2 : Math.PI/2

  // Reactively extract cubies from the store
  let cubies: Cubie[] = []
  cube3dState.subscribe((state) => {
    cubies = state.cubies.map((cubie) => cubie)
  })

  // Extract cubies that should be targeted by this rotation
  let targetFace = cubies
      .map((cubie, idx) => ({ cubie, originalIdx: idx }))
      .filter(({ cubie }) => isCubieOnTargetFace(cubie, rotationAxis))

  // Store initial position and rotation for all cubies on the target face
  const initialRotations = targetFace.map(({ cubie }) => cubie.rotation.clone())
  const initialPositions = targetFace.map(({ cubie }) => cubie.position.clone())

  // Compute the final rotations for all cubies
  const GLOBAL_QUATERNION = new Quaternion().setFromAxisAngle(rotationAxis, ROTATION_DIRECTION_AMOUNT)
  const finalRotations = targetFace.map(({ cubie }) => {
    return GLOBAL_QUATERNION.clone().multiply(cubie.rotation)
  })

  requestAnimationFrame(animateFrame)

  function animateFrame(timestamp: number) {
    if (startTime === null) {
      startTime = timestamp
    }
    const elapsedTime = (timestamp - startTime) / 1000
    const currentRotation = Utils.lerp(0, ROTATION_DIRECTION_AMOUNT, elapsedTime / turnDuration)

    targetFace.forEach(({ originalIdx }, idx) => {
      // Translate the position of each cubie around the center of the face
      let relativePosition = initialPositions[idx].clone().sub(rotationAxis);
      relativePosition = relativePosition.clone().applyAxisAngle(rotationAxis, currentRotation);
      cube3dState.update((state) => {
        return {
          ...state,
          cubies: state.cubies.map((cubie, stateIdx) => 
            stateIdx === originalIdx ? { ...cubie, position: relativePosition.add(rotationAxis) } : cubie
          )
        }
      })

      // Rotate the cubie around the center of the face
      const newQuaternion = new Quaternion()
      newQuaternion.slerpQuaternions(initialRotations[idx], finalRotations[idx], elapsedTime / turnDuration)
      cube3dState.update((state) => {
        return {
          ...state,
          cubies: state.cubies.map((cubie, stateIdx) =>
            stateIdx === originalIdx ? { ...cubie, rotation: newQuaternion } : cubie
          )
        }
      })
    })


    if (elapsedTime < turnDuration) {
      requestAnimationFrame(animateFrame);
    } else {
      // Snap the cubies to their final positions
      targetFace.forEach(({ originalIdx }, idx) => {
        // Translate the position of each cubie around the center of the face
        let relativePosition = initialPositions[idx].clone().sub(rotationAxis);
        relativePosition = relativePosition.clone().applyAxisAngle(rotationAxis, ROTATION_DIRECTION_AMOUNT)
        // Ensure that the cubie is exactly on the target face by rounding the position
        cube3dState.update((state) => {
          return {
            ...state,
            cubies: state.cubies.map((cubie, stateIdx) => 
              stateIdx === originalIdx ? { ...cubie, position: roundVectorComponents(relativePosition.add(rotationAxis)) } : cubie
            )
          }
        })

        // Rotate the cubie around the center of the face
        cube3dState.update((state) => {
          return {
            ...state,
            cubies: state.cubies.map((cubie, stateIdx) => 
              stateIdx === originalIdx ? { ...cubie, rotation: finalRotations[idx] } : cubie
            )
          }
        })
      })
      moveState.update((state) => {
        return {
          ...state,
          isMoving: false
        }
      })
    }
  }
}