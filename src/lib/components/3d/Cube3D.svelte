<script lang='ts'>
  import { onMount } from 'svelte'
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import * as THREE from 'three'
  import * as Utils from 'three/src/math/MathUtils'
  import Cubie from './Cubie.svelte'
  import type { CubieType } from '$lib/models/cube3d'
  import { cubies } from '$lib/models/cube3d'


  export let state: CubieType[] = cubies

  // const rotationAxis = new THREE.Vector3(0, 1, 0)
  const rotationAxis = new THREE.Vector3(1, 0, 0)

  // const rotationCenter = new THREE.Vector3(0, 1, 0)
  // const rotationCenter = new THREE.Vector3(1, 0, 0)

  // const rotationCenter = rotationAxis


  // let targetFace = cubies
  //   .map((cubie, idx) => ({ cubie, originalIndex: idx })) // Create an array of objects with cubie and index
  //   .filter(({ cubie }) => cubie.position.y === 1); // Filter based on your condition

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
    {#each state as cubie, index}
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