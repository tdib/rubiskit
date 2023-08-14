import { Vector3, Quaternion, Matrix4 } from 'three'
import { cameraState } from '$lib/stores/cube3dState'
import { DIRECTIONS, negateAxis } from '$lib/models/cube3d'
import { roundVectorComponents } from './permutation'

function rotatePosition(position: Vector3, axis: Vector3, angle: number = Math.PI/2, pivot: Vector3 = new Vector3(0, 0, 0)): Vector3 {
  const translatedPosition = position.clone().sub(pivot)
  
  const rotationMatrix = new Matrix4()
  rotationMatrix.makeRotationAxis(axis.normalize(), angle)
  const rotatedPosition = translatedPosition.applyMatrix4(rotationMatrix)
  rotatedPosition.add(pivot)
  
  return rotatedPosition
}

function determineUpVector(rotationAxis: Vector3): Vector3 {
  if (rotationAxis.equals(DIRECTIONS.UP)) {
    return DIRECTIONS.UP
  } else if (rotationAxis.equals(negateAxis(DIRECTIONS.UP))) {
    return DIRECTIONS.UP
  } else if (rotationAxis.equals(DIRECTIONS.RIGHT)) {
    return DIRECTIONS.FRONT
  } else if (rotationAxis.equals(negateAxis(DIRECTIONS.RIGHT))) {
    return negateAxis(DIRECTIONS.FRONT)
  } else if (rotationAxis.equals(DIRECTIONS.FRONT)) {
    return negateAxis(DIRECTIONS.RIGHT)
  } else if (rotationAxis.equals(negateAxis(DIRECTIONS.FRONT))) {
    return DIRECTIONS.RIGHT
  }
  throw new Error("Unsupported rotation axis");
}

// function determineUpVector(rotationAxis: Vector3): Vector3 {
//   if (rotationAxis.equals(new Vector3(0, 1, 0))) {
//     return new Vector3(0, 1, 0);
//   } else if (rotationAxis.equals(new Vector3(0, -1, 0))) {
//     return new Vector3(0, 1, 0);
//   } else if (rotationAxis.equals(new Vector3(1, 0, 0))) {
//     return new Vector3(0, 0, 1);
//   } else if (rotationAxis.equals(new Vector3(-1, 0, 0))) {
//     return new Vector3(0, 0, -1);
//   } else if (rotationAxis.equals(new Vector3(0, 0, 1))) {
//     return new Vector3(-1, 0, 0);
//   } else if (rotationAxis.equals(new Vector3(0, 0, -1))) {
//     return new Vector3(1, 0, 0);
//   }
//   throw new Error("Unsupported rotation axis");
// }

export function animateCameraRotation(
  axis: Vector3, 
  pivot: Vector3 = new Vector3(0, 0, 0),
  duration: number = 500
) {
  console.log('here')
  let cameraPosition: Vector3 = new Vector3(6, 6, 6)
  let upVector: Vector3 = new Vector3(0, 1, 0)
  console.log('up1', upVector);
  cameraState.subscribe((state) => {
    cameraPosition = state.position
    upVector = state.up
  })
  console.log('up2', upVector);
  
  const startPosition = cameraPosition
  const endPosition = rotatePosition(startPosition, axis);
  
  const startQuaternion = new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(startPosition, pivot, axis));
  const endQuaternion = new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(endPosition, pivot, axis));
  
  const startUpQuaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), upVector);
  const endUpQuaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), determineUpVector(axis));
  
  let animationProgress = 0;
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    animationProgress = elapsed / duration;
    
    if (animationProgress < 1) {
      const currentQuaternion = new Quaternion();
      currentQuaternion.slerpQuaternions(startQuaternion, endQuaternion, animationProgress)
      
      const direction = new Vector3(0, 0, 1).applyQuaternion(currentQuaternion);
      cameraState.update((state) => {
        return {
          ...state,
          position: direction.multiplyScalar(startPosition.length())
        }
      })
      
      const currentUpQuaternion = new Quaternion();
      currentUpQuaternion.slerpQuaternions(startUpQuaternion, endUpQuaternion, animationProgress);
      
      const currentUpVector = new Vector3(0, 1, 0).applyQuaternion(currentUpQuaternion);
      cameraState.update((state) => {
        return {
          ...state,
          up: currentUpVector
        }
      })

      requestAnimationFrame(animate);
    } else {
      cameraState.update((state) => {
        return {
          ...state,
          position: endPosition,
          up: roundVectorComponents(upVector)
        }
      })
    }
  };
  
  animate();
}