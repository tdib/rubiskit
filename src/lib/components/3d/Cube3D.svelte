<script lang='ts'>
  import { Canvas, T } from '@threlte/core'
  import { Euler, PerspectiveCamera } from 'three'
  import Cubie from './Cubie.svelte'
  import { cube3dState, moveState, cameraState, rotationState } from '$lib/stores/cube3dState'
  import { turnFace } from '$lib/util/permutation'
  import { rotateCamera } from '$lib/util/rotation'

  // Sync the camera position and up vector with the store
  $: cameraPosition = $cameraState.position
  $: cameraRotation = $cameraState.rotation

  // Ensure the cube begins in the middle of the screen
  let camera: PerspectiveCamera
  function onCameraCreated({ ref }: { ref: PerspectiveCamera }) {
    camera = ref
    camera.lookAt(0, 0, 0)
  }

  // Handle rotations (x, y, and z)
  const defaultRotationSpeed = 0.2
  let rotationSpeed = defaultRotationSpeed
  $: if (!$rotationState.isRotating && $rotationState.rotationQueue.length > 0) {
    // Put a "lock" on the rotations so they don't interfere with each other
    $rotationState.isRotating = true

    // Adjust the speed of the rotations based on the length of the queue
    // More in the queue will make rotations faster
    if ($rotationState.rotationQueue.length > 1) {
      rotationSpeed = defaultRotationSpeed/(1 + $rotationState.rotationQueue.length*defaultRotationSpeed)
    } else {
      rotationSpeed = defaultRotationSpeed
    }

    // Rotate the camera around the cube to give the perspective of the cube rotating
    let r = $rotationState.rotationQueue[0]
    rotateCamera(
      r.axis,
      r.isClockwise,
      rotationSpeed
    )

    // Remove this rotation from the queue
    $rotationState.rotationQueue.shift()
  }

  // Handle moves (R, L, U, D, F, B)
  const defaultTurnSpeed = 0.15
  let turnSpeed = defaultTurnSpeed
  $: if (!$moveState.isMoving && $moveState.moveQueue.length > 0) {
    // Put a "lock" on the moves so they don't interfere with each other
    $moveState.isMoving = true

    // Adjust the speed of the moves based on the length of the queue
    // More in the queue will make moves faster
    if ($moveState.moveQueue.length > 1) {
      turnSpeed = defaultTurnSpeed/(1 + $moveState.moveQueue.length*defaultTurnSpeed)
    } else {
      turnSpeed = defaultTurnSpeed
    }

    // Actually perform the permutation on the face required
    turnFace(
      $moveState.moveQueue[0].move,
      $moveState.moveQueue[0].isClockwise,
      turnSpeed
    )

    // Remove this move from the queue
    $moveState.moveQueue.shift()
  }
</script>

<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
      rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}
      on:create={onCameraCreated}
    />

    <T.AmbientLight intensity={0.8} />

    {#each $cube3dState.cubies as cubie}
      <Cubie
        position={[cubie.position.x, cubie.position.y, cubie.position.z]}
        rotation={new Euler().setFromQuaternion(cubie.rotation)}
        colour1={cubie.colour.right}
        colour2={cubie.colour.left}
        colour3={cubie.colour.up}
        colour4={cubie.colour.down}
        colour5={cubie.colour.front}
        colour6={cubie.colour.back}
      />
    {/each}

  </Canvas>
</div>

<style>
  div {
    width: 100vw;
    height: 100vh;
  }
</style>