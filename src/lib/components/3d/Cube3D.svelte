<script lang='ts'>
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls, Float } from '@threlte/extras'
  import { Euler } from 'three'
  import Cubie from './Cubie.svelte'
  import { cube3dState, moveState, cameraState, rotationState } from '$lib/stores/cube3dState'
  import { turn } from '$lib/util/permutation'
  import { rotate } from '$lib/util/rotation'

  let cameraPosition = $cameraState.position
  $: cameraPosition = $cameraState.position

  let upVector = $cameraState.up
  $: upVector = $cameraState.up

  const defaultRotationSpeed = 0.2
  let rotationSpeed = defaultRotationSpeed
  $: if (!$rotationState.isRotating && $rotationState.rotationQueue.length > 0) {
    $rotationState.isRotating = true

    if ($rotationState.rotationQueue.length > 1) {
      rotationSpeed = defaultRotationSpeed/(1 + $rotationState.rotationQueue.length*defaultRotationSpeed)
    } else {
      rotationSpeed = defaultRotationSpeed
    }

    let r = $rotationState.rotationQueue[0]
    rotate(
      r.axis,
      r.isClockwise,
      rotationSpeed
    )

    $rotationState.rotationQueue.shift()
  }

  const defaultTurnSpeed = 0.15
  let turnSpeed = defaultTurnSpeed
  $: if (!$moveState.isMoving && $moveState.moveQueue.length > 0) {
    $moveState.isMoving = true

    if ($moveState.moveQueue.length > 1) {
      turnSpeed = defaultTurnSpeed/(1 + $moveState.moveQueue.length*defaultTurnSpeed)
    } else {
      turnSpeed = defaultTurnSpeed
    }

    turn(
      $moveState.moveQueue[0].move,
      $moveState.moveQueue[0].isClockwise,
      turnSpeed
    )
    $moveState.moveQueue.shift()
  }
</script>

<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
      up={[upVector.x, upVector.y, upVector.z]}
    >
      <OrbitControls
        enableDamping
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      />
    </T.PerspectiveCamera>

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