<script lang='ts'>
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Euler } from 'three'
  import Cubie from './Cubie.svelte'
  import { cube3dState, moveState } from '$lib/stores/cube3dState'
  import { turn } from '$lib/util/rotation'


  let defaultTurnSpeed = 0.15
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
    {#each $cube3dState as cubie}
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