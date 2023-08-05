<script lang='ts'>
  import { Canvas, T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
  import * as THREE from 'three'
  import * as Utils from 'three/src/math/MathUtils'
  import Cubie from './Cubie.svelte'

  const RED = new THREE.Color('#a61b1b')
  const BLUE = new THREE.Color('#1c52c7')
  const GREEN = new THREE.Color('#18a81c')
  const ORANGE = new THREE.Color('#c46b27')
  const YELLOW = new THREE.Color('#e8c723')
  const WHITE = new THREE.Color('#cccccc')

</script>

<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[-3, 3, 3]}
      fov={90}
    >
      <OrbitControls
        enableZoom={false}
        enableDamping
        autoRotateSpeed={0.2}
      />
    </T.PerspectiveCamera>

    <!-- <T.DirectionalLight
      intensity={0.8}
      position.x={5}
      position.y={10}
    /> -->
    <T.AmbientLight intensity={0.8} />

    <!-- <Grid
      position.y={-0.501}
      cellColor="#ffffff"
      sectionColor="#ffffff"
      sectionThickness={0}
      fadeDistance={25}
      cellSize={2}
    /> -->

    <!-- <ContactShadows
      scale={10}
      blur={2}
      far={2.5}
      opacity={0.5}
    /> -->

    <Float
      floatIntensity={1}
      floatingRange={[0, 0.3]}
    >
      <Cubie
        position={[1, 1, -1]}
        rotation={[0, Utils.degToRad(-90), 0]}
        colour1={ORANGE}
        colour2={WHITE}
        colour3={GREEN}
      />

      <Cubie
        position={[0, 1, -1]}
        colour1={GREEN}
        colour2={WHITE}
      />

      <Cubie
        position={[-1, 1, -1]}
        colour1={GREEN}
        colour2={WHITE}
        colour3={RED}
      />

      <Cubie
        position={[1, 0, -1]}
        rotation={[0, 0, Utils.degToRad(-90)]}
        colour1={GREEN}
        colour2={ORANGE}
      />

      <Cubie
        position={[0, 0, -1]}
        colour1={GREEN}
      />

      <Cubie
        position={[-1, 0, -1]}
        rotation={[0, 0, Utils.degToRad(90)]}
        colour1={GREEN}
        colour2={RED}
      />


      <Cubie
        position={[1, -1, -1]}
        rotation={[Utils.degToRad(-90), Utils.degToRad(-90), 0]}
        colour1={ORANGE}
        colour2={GREEN}
        colour3={YELLOW}
      />

      <Cubie
        position={[0, -1, -1]}
        rotation={[Utils.degToRad(-90), 0, 0]}
        colour1={YELLOW}
        colour2={GREEN}
      />

      <Cubie
        position={[-1, -1, -1]}
        rotation={[Utils.degToRad(-90), 0, 0]}
        colour1={YELLOW}
        colour2={GREEN}
        colour3={RED}
      />


      <Cubie
        position={[1, -1, 0]}
        rotation={[0, Utils.degToRad(-90), Utils.degToRad(180)]}
        colour1={ORANGE}
        colour2={YELLOW}
      />

      <Cubie
        position={[0, -1, 0]}
        rotation={[Utils.degToRad(-90), 0, 0]}
        colour1={YELLOW}
      />

      <Cubie
        position={[-1, -1, 0]}
        rotation={[Utils.degToRad(-90), 0, Utils.degToRad(90)]}
        colour1={YELLOW}
        colour2={RED}
      />

      <Cubie
        position={[1, 0, 0]}
        rotation={[0, Utils.degToRad(-90), 0]}
        colour1={ORANGE}
      />

      <!-- Core -->
      <Cubie
        position={[0, 0, 0]}
      ></Cubie>

      <Cubie
        position={[-1, 0, 0]}
        rotation={[0, Utils.degToRad(90), 0]}
        colour1={RED}
      />

      <Cubie
        position={[-1, 1, 0]}
        rotation={[0, Utils.degToRad(90), 0]}
        colour1={RED}
        colour2={WHITE}
      />

      <Cubie
        position={[0, 1, 0]}
        rotation={[Utils.degToRad(90), 0, 0]}
        colour1={WHITE}
      />

      <Cubie
        position={[1, 1, 0]}
        rotation={[0, Utils.degToRad(-90), 0]}
        colour1={ORANGE}
        colour2={WHITE}
      />

      <Cubie
        position={[1, 1, 1]}
        rotation={[Utils.degToRad(90), Utils.degToRad(-90), 0]}
        colour1={ORANGE}
        colour2={BLUE}
        colour3={WHITE}
      />

      <Cubie
        position={[0, 1, 1]}
        rotation={[Utils.degToRad(90), 0, 0]}
        colour1={WHITE}
        colour2={BLUE}
      />

      <Cubie
        position={[-1, 1, 1]}
        rotation={[Utils.degToRad(90), 0, 0]}
        colour1={WHITE}
        colour2={BLUE}
        colour3={RED}
      />

      <Cubie
        position={[1, 0, 1]}
        rotation={[Utils.degToRad(90), Utils.degToRad(-90), 0]}
        colour1={ORANGE}
        colour2={BLUE}
      />

      <Cubie
        position={[0, 0, 1]}
        rotation={[Utils.degToRad(180), 0, 0]}
        colour1={BLUE}
      />

      <Cubie
        rotation={[Utils.degToRad(90), Utils.degToRad(90), 0]}
        position={[-1, 0, 1]}
        colour1={RED}
        colour2={BLUE}
      />

      <Cubie
        position={[1, -1, 1]}
        rotation={[Utils.degToRad(180), Utils.degToRad(-90), 0]}
        colour1={ORANGE}
        colour2={YELLOW}
        colour3={BLUE}
      />

      <Cubie
        position={[0, -1, 1]}
        rotation={[Utils.degToRad(180), 0, 0]}
        colour1={BLUE}
        colour2={YELLOW}
      />

      <Cubie
        position={[-1, -1, 1]}
        rotation={[Utils.degToRad(180), 0, 0]}
        colour1={BLUE}
        colour2={YELLOW}
        colour3={RED}
      />

      <!-- <T.Mesh>
        <T.BoxGeometry />
        <T.MeshStandardMaterial color='#00ff00' />
      </T.Mesh> -->
    </Float>


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