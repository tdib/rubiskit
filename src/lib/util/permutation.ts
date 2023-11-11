import type { Cubie } from '$lib/models/cube3d'
import { Quaternion, Vector3 } from 'three'
import * as Utils from 'three/src/math/MathUtils'
import { cube3dState, moveState } from '$lib/stores/cube3dState'
import { roundVectorComponents, isCubieOnTargetFace, hasOneZero, flipVector } from './util'

/**
 * Turn the specified face of the cube by 90 degrees.
 * 
 * @param rotationAxis The axis to rotate around
 * @param isClockwise Boolean indicating whether the rotation is clockwise or anti-clockwise
 * @param turnDuration The number of seconds the turn animation should take
 */
export function turnFace(rotationAxis: Vector3, isClockwise: boolean = true, turnDuration: number = 0.15) {
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
    
  // If the rotation axis is for a slice move (i.e. the axis is indicated by a 0 instead of a 1)
  // then flip it to be a regular axis, e.g. (1, 1, 0) -> (0, 0, 1)
  if (hasOneZero(rotationAxis)) {
    rotationAxis = flipVector(rotationAxis)
  }

  // Store initial position and rotation for all cubies on the target face
  const initialRotations = targetFace.map(({ cubie }) => cubie.rotation.clone())
  const initialPositions = targetFace.map(({ cubie }) => cubie.position.clone())

  // Compute the final rotations for all cubies
  const GLOBAL_QUATERNION = new Quaternion().setFromAxisAngle(rotationAxis, ROTATION_DIRECTION_AMOUNT)
  const finalRotations = targetFace.map(({ cubie }) => {
    return GLOBAL_QUATERNION.clone().multiply(cubie.rotation)
  })

  requestAnimationFrame(animateTurnFrame)

  let startTime: number | null = null
  function animateTurnFrame(timestamp: number) {
    if (startTime === null) {
      startTime = timestamp
    }
    const elapsedTime = (timestamp - startTime) / 1000
    const currentRotation = Utils.lerp(0, ROTATION_DIRECTION_AMOUNT, elapsedTime / turnDuration)

    targetFace.forEach(({ originalIdx }, idx) => {
      // Translate the position of each cubie around the center of the face
      let relativePosition = initialPositions[idx].clone().sub(rotationAxis)
      relativePosition = relativePosition.clone().applyAxisAngle(rotationAxis, currentRotation)
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
      requestAnimationFrame(animateTurnFrame)
    } else {
      // Snap the cubies to their final positions
      targetFace.forEach(({ originalIdx }, idx) => {
        // Translate the position of each cubie around the center of the face
        let relativePosition = initialPositions[idx].clone().sub(rotationAxis)
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