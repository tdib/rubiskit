<script lang='ts'>
  import { onMount } from 'svelte'
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import * as THREE from 'three'
  import * as Utils from 'three/src/math/MathUtils'
  import Cubie from './Cubie.svelte'
  import { cubies } from '$lib/models/cube3d'

  let durationInSeconds = .5
  const totalRotation = Math.PI / 2
  let startTime: number | null = null
  const rotationAxis = new THREE.Vector3(0, 1, 0)  // x-axis for face x=1
  const rotationCenter = new THREE.Vector3(0, 1, 0)  // Center of x=1 face for a 3x3 cube

  let targetFace = cubies
    .map((cubie, idx) => ({ cubie, originalIndex: idx })) // Create an array of objects with cubie and index
    .filter(({ cubie }) => cubie.position.y === 1); // Filter based on your condition

  // Store initial rotation quaternions for all cubies
  const initialRotations = targetFace.map(({ cubie }) => cubie.rotation.clone())
  const initialPositions = targetFace.map(({ cubie }) => cubie.position.clone())

  // Compute the final rotations for all cubies
  const finalRotations = targetFace.map(({ cubie }) => {
    const finalQuaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, Math.PI / 2) // 90 degree rotation
    return cubie.rotation.clone().multiply(finalQuaternion)
  });

  onMount(() => {
    function animateFrame(timestamp: number) {
      if (startTime === null) {
        startTime = timestamp
      }
      const elapsedTime = (timestamp - startTime) / 1000
      const currentRotation = Utils.lerp(0, totalRotation, elapsedTime / durationInSeconds)

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
          relativePosition = relativePosition.clone().applyAxisAngle(rotationAxis, totalRotation)
          cubies[originalIndex].position = relativePosition.add(rotationCenter)

          // Rotate the cubie around the center of the face
          const newQuaternion = new THREE.Quaternion()
          newQuaternion.slerpQuaternions(initialRotations[idx], finalRotations[idx], elapsedTime / durationInSeconds)
          cubies[originalIndex].rotation = finalRotations[idx]
        })
      }
    }

    requestAnimationFrame(animateFrame)
  })
</script>

<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[6, 6, 6]}
    >
      <OrbitControls
        enableZoom={false}
        enableDamping
        autoRotateSpeed={0.2}
      />
    </T.PerspectiveCamera>

    <T.AmbientLight intensity={0.8} />

    <!-- <Float> -->
    {#each cubies as cubie}
      <Cubie
        position={[cubie.position.x, cubie.position.y, cubie.position.z]}
        rotation={new THREE.Euler().setFromQuaternion(cubie.rotation)}
        colour1={cubie.colour.right}
        colour2={cubie.colour.left}
        colour3={cubie.colour.up}
        colour4={cubie.colour.down}
        colour5={cubie.colour.front}
        colour6={cubie.colour.back}
      />
    {/each}
    <!-- </Float> -->


  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }
</style>