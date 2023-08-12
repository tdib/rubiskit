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
  const WHITE = new THREE.Color('#eeeeee')

  let cubies = [
      {
        position: [1, 1, -1],
        rotation: [0, Utils.degToRad(-90), 0],
        colour1: RED,
        colour2: WHITE,
        colour3: BLUE,
      },

      {
        position: [0, 1, -1],
        rotation: [0, 0, 0],
        colour1: BLUE,
        colour2: WHITE,
      },

      {
        position: [-1, 1, -1],
        rotation: [0, 0, 0],
        colour1: BLUE,
        colour2: WHITE,
        colour3: ORANGE,
      },

      {
        position: [1, 0, -1],
        rotation: [0, 0, Utils.degToRad(-90)],
        colour1: BLUE,
        colour2: RED,
      },

      {
        position: [0, 0, -1],
        rotation: [0, 0, 0],
        colour1: BLUE,
      },

      {
        position: [-1, 0, -1],
        rotation: [0, 0, Utils.degToRad(90)],
        colour1: BLUE,
        colour2: ORANGE,
      },


      {
        position: [1, -1, -1],
        rotation: [Utils.degToRad(-90), Utils.degToRad(-90), 0],
        colour1: RED,
        colour2: BLUE,
        colour3: YELLOW,
      },

      {
        position: [0, -1, -1],
        rotation: [Utils.degToRad(-90), 0, 0],
        colour1: YELLOW,
        colour2: BLUE,
      },

      {
        position: [-1, -1, -1],
        rotation: [Utils.degToRad(-90), 0, 0],
        colour1: YELLOW,
        colour2: BLUE,
        colour3: ORANGE,
      },


      {
        position: [1, -1, 0],
        rotation: [0, Utils.degToRad(-90), Utils.degToRad(180)],
        colour1: RED,
        colour2: YELLOW,
      },

      {
        position: [0, -1, 0],
        rotation: [Utils.degToRad(-90), 0, 0],
        colour1: YELLOW,
      },

      {
        position: [-1, -1, 0],
        rotation: [Utils.degToRad(-90), 0, Utils.degToRad(90)],
        colour1: YELLOW,
        colour2: ORANGE,
      },

      {
        position: [1, 0, 0],
        rotation: [0, Utils.degToRad(-90), 0],
        colour1: RED,
      },

      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [-1, 0, 0],
        rotation: [0, Utils.degToRad(90), 0],
        colour1: ORANGE,
      },

      {
        position: [-1, 1, 0],
        rotation: [0, Utils.degToRad(90), 0],
        colour1: ORANGE,
        colour2: WHITE,
      },

      {
        position: [0, 1, 0],
        rotation: [Utils.degToRad(90), 0, 0],
        colour1: WHITE,
      },

      {
        position: [1, 1, 0],
        rotation: [0, Utils.degToRad(-90), 0],
        colour1: RED,
        colour2: WHITE,
      },

      {
        position: [1, 1, 1],
        rotation: [Utils.degToRad(90), Utils.degToRad(-90), 0],
        colour1: RED,
        colour2: GREEN,
        colour3: WHITE,
      },

      {
        position: [0, 1, 1],
        rotation: [Utils.degToRad(90), 0, 0],
        colour1: WHITE,
        colour2: GREEN,
      },

      {
        position: [-1, 1, 1],
        rotation: [Utils.degToRad(90), 0, 0],
        colour1: WHITE,
        colour2: GREEN,
        colour3: ORANGE,
      },

      {
        position: [1, 0, 1],
        rotation: [Utils.degToRad(90), Utils.degToRad(-90), 0],
        colour1: RED,
        colour2: GREEN,
      },

      {
        position: [0, 0, 1],
        rotation: [Utils.degToRad(180), 0, 0],
        colour1: GREEN,
      },

      {
        position: [-1, 0, 1],
        rotation: [Utils.degToRad(90), Utils.degToRad(90), 0],
        colour1: ORANGE,
        colour2: GREEN,
      },

      {
        position: [1, -1, 1],
        rotation: [Utils.degToRad(180), Utils.degToRad(-90), 0],
        colour1: RED,
        colour2: YELLOW,
        colour3: GREEN,
      },

      {
        position: [0, -1, 1],
        rotation: [Utils.degToRad(180), 0, 0],
        colour1: GREEN,
        colour2: YELLOW,
      },

      {
        position: [-1, -1, 1],
        rotation: [Utils.degToRad(180), 0, 0],
        colour1: GREEN,
        colour2: YELLOW,
        colour3: ORANGE,
      },
  ]

  type Position = [Number, Number, Number]




  function add([x1, y1, z1]: number[], [x2, y2, z2]: number[]): number[] {
    return [x1 + x2, y1 + y2, z1 + z2];
  }

  function subtract([x1, y1, z1]: number[], [x2, y2, z2]: number[]): number[] {
      return [x1 - x2, y1 - y2, z1 - z2];
  }
  function rotateAroundAxis([x, y, z]: number[], axis: number[], angleDegrees: number): number[] {
    const theta = (Math.PI / 180) * angleDegrees;  // Convert to radians
    let cosT = Math.cos(theta);
    let sinT = Math.sin(theta);

    if (axis[0] === 1) {  // X-axis
        return [
            x,
            cosT * y - sinT * z,
            sinT * y + cosT * z
        ];
    } else if (axis[1] === 1) {  // Y-axis
        return [
            cosT * x + sinT * z,
            y,
            -sinT * x + cosT * z
        ];
    } else if (axis[2] === 1) {  // Z-axis
        return [
            cosT * x - sinT * y,
            sinT * x + cosT * y,
            z
        ];
    }

    throw new Error("Invalid rotation axis");
  }

  let angleIncrement = 5;  // Amount to rotate each frame
  let currentAngle = 0;    // Track current rotation
  const rotationAxis = [0, 1, 0];  // x-axis for face x=1
  const rotationCenter = [0, 1, 0];  // Center of x=1 face for a 3x3 cube

  import { onMount } from 'svelte'

  let r = cubies
    .map((cubie, idx) => ({ cubie, idx })) // Create an array of objects with cubie and index
    .filter(({ cubie }) => cubie.position[1] === 1); // Filter based on your condition

  onMount(() => {
    function animateFrame() {
      console.log('----------------');
      currentAngle += angleIncrement;

      r.map(({cubie, idx}) => {
        let position = subtract(cubie.position, rotationCenter);  // Translate to origin
        position = rotateAroundAxis(position, rotationAxis, angleIncrement);
        position = add(position, rotationCenter);  // Translate back

        // console.log(cubie.position, idx);

        // console.log(cubie.position);
        cubies[idx].position = position;
        // console.log('---');

        // cubies[idx].rotation[1] += Utils.degToRad(angleIncrement)
      })

      if (currentAngle < 90) {
        requestAnimationFrame(animateFrame);
      }
    }


    animateFrame();
  })


  // r.forEach((cubie) => {
  //   cubie.rotation[0] = Utils.degToRad(90)
  // })

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
        position={cubie.position}
        rotation={cubie.rotation}
        colour1={cubie.colour1}
        colour2={cubie.colour2}
        colour3={cubie.colour3}
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