<script lang='ts'>
  import { Cube } from '../lib/models/cube'
  import Net from '$lib/components/2d/Net.svelte'
  import Cube3D from '$lib/components/3d/Cube3D.svelte'
  import * as THREE from 'three'

  // import { turn } from '$lib/util/rotation'
  import { cubies } from '$lib/models/cube3d'

  let cube = new Cube()

  function handleKeyPress(e: KeyboardEvent) {
    // Main permutations
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'r') {
      if (e.shiftKey) {
        cube.RPrime()
      } else {
        cube.R()
        turn(new THREE.Vector3(1, 0, 0))
      }
    } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'u') {
      if (e.shiftKey) {
        cube.UPrime()
      } else {
        cube.U()
        turn(new THREE.Vector3(0, 1, 0))
      }
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'l') {
      if (e.shiftKey) {
        cube.LPrime()
      } else {
        cube.L()
      }
    } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'd') {
      if (e.shiftKey) {
        cube.DPrime()
      } else {
        cube.D()
      }
    } else if (e.key.toLowerCase() === 'f') {
      if (e.shiftKey) {
        cube.FPrime()
      } else {
        cube.F()
      }
    } else if (e.key.toLowerCase() === 'b') {
      if (e.shiftKey) {
        cube.BPrime()
      } else {
        cube.B()
      }
    // Advanced moves
    } else if (e.key.toLowerCase() === 'm') {
      if (e.shiftKey) {
        cube.mPrime()
      } else {
        cube.m()
      }
    } else if (e.key.toLowerCase() === 'e') {
      if (e.shiftKey) {
        cube.ePrime()
      } else {
        cube.e()
      }
    } else if (e.key.toLowerCase() === 's') {
      if (e.shiftKey) {
        cube.sPrime()
      } else {
        cube.s()
      }
    // Rotations
    } else if (e.key.toLowerCase() === 'x') {
      if (e.shiftKey) {
        cube.xPrime()
      } else {
        cube.x()
      }
    } else if (e.key.toLowerCase() === 'y') {
      if (e.shiftKey) {
        cube.yPrime()
      } else {
        cube.y()
      }
    } else if (e.key.toLowerCase() === 'z') {
      if (e.shiftKey) {
        cube.zPrime()
      } else {
        cube.z()
      }
    }

    cube = cube
  }

  import type { CubieType } from '$lib/models/cube3d'
  // import * as THREE from 'three'
  import * as Utils from 'three/src/math/MathUtils'

  // Define how long a turn should take
  let durationInSeconds = .5

  const ROTATION_AMOUNT = - Math.PI / 2
  let startTime: number | null = null

  // Function for rounding a vector to the nearest integer - used to account for precision error
  function roundVectorComponents(vector: THREE.Vector3): THREE.Vector3 {
    vector.x = Math.round(vector.x)
    vector.y = Math.round(vector.y)
    vector.z = Math.round(vector.z)

    return vector
  }

  // This function checks if the cubie's position aligns with the provided rotation axis
  function isCubieOnTargetFace(cubie: CubieType, rotationAxis: THREE.Vector3): boolean {
      if (rotationAxis.x) return cubie.position.x === rotationAxis.x
      if (rotationAxis.y) return cubie.position.y === rotationAxis.y
      if (rotationAxis.z) return cubie.position.z === rotationAxis.z
      return false
  }

  export function turn(rotationAxis: THREE.Vector3) {
    let startTime: number | null = null
    const rotationCenter = rotationAxis

    let targetFace = cubies
        .map((cubie, idx) => ({ cubie, originalIndex: idx }))
        .filter(({ cubie }) => isCubieOnTargetFace(cubie, rotationAxis));

    // Store initial position and rotation for all cubies on the target face
    const initialRotations = targetFace.map(({ cubie }) => cubie.rotation.clone())
    const initialPositions = targetFace.map(({ cubie }) => cubie.position.clone())

    // Compute the final rotations for all cubies
    const CLOCKWISE_ROTATION_QUATERNION = new THREE.Quaternion().setFromAxisAngle(rotationAxis, ROTATION_AMOUNT);
    const finalRotations = targetFace.map(({ cubie }) => {
      return CLOCKWISE_ROTATION_QUATERNION.clone().multiply(cubie.rotation)
    })

    requestAnimationFrame(animateFrame)

    function animateFrame(timestamp: number) {
      console.log('animating');
      if (startTime === null) {
        startTime = timestamp
      }
      const elapsedTime = (timestamp - startTime) / 1000
      const currentRotation = Utils.lerp(0, ROTATION_AMOUNT, elapsedTime / durationInSeconds)

      // Temporary Object3D to perform the world-space rotation
      const rotationObject = new THREE.Object3D();
      rotationObject.position.copy(rotationCenter); // Set its position to the rotation center

      targetFace.forEach(({ originalIndex }, idx) => {
        // Translate the position of each cubie around the center of the face
        let relativePosition = initialPositions[idx].clone().sub(rotationCenter);
        relativePosition = relativePosition.clone().applyAxisAngle(rotationAxis, currentRotation);
        cubies[originalIndex].position = relativePosition.add(rotationCenter)

        // Rotate the cubie around the center of the face
        const newQuaternion = new THREE.Quaternion()
        newQuaternion.slerpQuaternions(initialRotations[idx], finalRotations[idx], elapsedTime / durationInSeconds)
        cubies[originalIndex].rotation = newQuaternion

      })


      if (elapsedTime < durationInSeconds) {
        requestAnimationFrame(animateFrame);
      } else {
        // Snap the cubies to their final positions
        targetFace.forEach(({ originalIndex }, idx) => {
          // Translate the position of each cubie around the center of the face
          let relativePosition = initialPositions[idx].clone().sub(rotationCenter);
          relativePosition = relativePosition.clone().applyAxisAngle(rotationAxis, ROTATION_AMOUNT)
          // Ensure that the cubie is exactly on the target face by rounding the position
          cubies[originalIndex].position = roundVectorComponents(relativePosition.add(rotationCenter))

          // Rotate the cubie around the center of the face
          const newQuaternion = new THREE.Quaternion()
          newQuaternion.slerpQuaternions(initialRotations[idx], finalRotations[idx], elapsedTime / durationInSeconds)
          cubies[originalIndex].rotation = finalRotations[idx]
        })

        // console log all cubie positions
        cubies.forEach((cubie, idx) => {
          console.log('cubie', idx, cubie.position);
        })
      }
    }
  }
</script>

<!-- <div>
  <h1>Rubiskit</h1>
  <h2>(pronounced roo-biscuit, emphasis on the biscuit)</h2>
</div>
<Net cube={cube} /> -->

<svelte:window on:keydown={handleKeyPress}/>
<Cube3D state={cubies}></Cube3D>

<style lang='scss'>
  h1, h2 {
    margin: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block-start: 3em;
  }

</style>
