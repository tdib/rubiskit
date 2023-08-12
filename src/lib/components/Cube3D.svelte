<script lang='ts'>
  import { Canvas, T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
  import * as THREE from 'three'
  import * as Utils from 'three/src/math/MathUtils'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import Cubie from './Cubie.svelte'

  const RED = new THREE.Color('#a61b1b')
  const BLUE = new THREE.Color('#1c52c7')
  const GREEN = new THREE.Color('#18a81c')
  const ORANGE = new THREE.Color('#c46b27')
  const YELLOW = new THREE.Color('#e8c723')
  const WHITE = new THREE.Color('#eeeeee')

  type Colour = {
    right?: THREE.Color
    left?: THREE.Color
    up?: THREE.Color
    down?: THREE.Color
    front?: THREE.Color
    back?: THREE.Color
  }

  type Cubie = {
    position: THREE.Vector3
    rotation: THREE.Quaternion
    colour: Colour
  }


  let cubies: Cubie[] = [
    {
      position: new THREE.Vector3(1, 1, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        up: WHITE,
        back: BLUE,
        right: RED,
      }
    },
    {
      position: new THREE.Vector3(0, 1, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        up: WHITE,
        back: BLUE,
      }
    },
    {
      position: new THREE.Vector3(-1, 1, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        up: WHITE,
        back: BLUE,
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(1, 0, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        back: BLUE,
        right: RED,
      }
    },
    {
      position: new THREE.Vector3(0, 0, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        back: BLUE,
      }
    },
    {
      position: new THREE.Vector3(-1, 0, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        back: BLUE,
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(1, -1, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        back: BLUE,
        right: RED,
        down: YELLOW,
      }
    },
    {
      position: new THREE.Vector3(0, -1, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        back: BLUE,
        down: YELLOW,
      }
    },
    {
      position: new THREE.Vector3(-1, -1, -1),
      rotation: new THREE.Quaternion(),
      colour: {
        back: BLUE,
        down: YELLOW,
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(1, -1, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        right: RED,
        down: YELLOW,
      }
    },
    {
      position: new THREE.Vector3(0, -1, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        down: YELLOW,
      }
    },
    {
      position: new THREE.Vector3(-1, -1, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        down: YELLOW,
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(1, 0, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        right: RED,
      }
    },
    {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Quaternion(),
      colour: {}
    },
    {
      position: new THREE.Vector3(-1, 0, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(-1, 1, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        up: WHITE,
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(0, 1, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        up: WHITE,
      }
    },
    {
      position: new THREE.Vector3(1, 1, 0),
      rotation: new THREE.Quaternion(),
      colour: {
        up: WHITE,
        right: RED,
      }
    },
    {
      position: new THREE.Vector3(1, 1, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        up: WHITE,
        right: RED,
      }
    },
    {
      position: new THREE.Vector3(0, 1, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        up: WHITE,
      }
    },
    {
      position: new THREE.Vector3(-1, 1, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        up: WHITE,
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(1, 0, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        right: RED
      }
    },
    {
      position: new THREE.Vector3(0, 0, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
      }
    },
    {
      position: new THREE.Vector3(-1, 0, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        left: ORANGE,
      }
    },
    {
      position: new THREE.Vector3(1, -1, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        right: RED,
        down: YELLOW,
      }
    },
    {
      position: new THREE.Vector3(0, -1, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        down: YELLOW,
      }
    },
    {
      position: new THREE.Vector3(-1, -1, 1),
      rotation: new THREE.Quaternion(),
      colour: {
        front: GREEN,
        left: ORANGE,
        down: YELLOW,
      }
    },
  ]

  function rotateAroundAxis(vector: THREE.Vector3, axis: THREE.Vector3, theta: number): THREE.Vector3 {
    const rotatedVector = vector.clone().applyAxisAngle(axis, theta);
    return rotatedVector;
  }

  //   function rotateAroundAxis(position: THREE.Vector3, rotationAxis: THREE.Vector3, angleIncrement: number): { newPosition: THREE.Vector3, rotationQuaternion: THREE.Quaternion } {
  //     const theta = THREE.MathUtils.degToRad(angleIncrement); 

  //     const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, theta);
      
  //     const newPosition = position.clone();
  //     newPosition.sub(rotationCenter).applyQuaternion(rotationQuaternion).add(rotationCenter);

  //     return { newPosition, rotationQuaternion }
  // }
  function computeFinalRotation(rotationAxis: THREE.Vector3, totalAngle: number): THREE.Quaternion {
      // return new THREE.Quaternion().setFromAxisAngle(rotationAxis, THREE.MathUtils.degToRad(totalAngle));
      return new THREE.Quaternion().setFromAxisAngle(rotationAxis, totalAngle);
  }




  const rotationAxis = new THREE.Vector3(0, 1, 0)  // x-axis for face x=1
  const rotationCenter = new THREE.Vector3(0, 1, 0)  // Center of x=1 face for a 3x3 cube

  let durationInSeconds = 0.25
  const totalRotation = Math.PI / 2
  let startTime: number | null = null

  import { onMount } from 'svelte'

  let r = cubies
    .map((cubie, idx) => ({ cubie, originalIndex: idx })) // Create an array of objects with cubie and index
    .filter(({ cubie }) => cubie.position.y === 1); // Filter based on your condition

  // Store initial rotation quaternions for all cubies
  const initialRotations = r.map(({ cubie }) => cubie.rotation.clone())
  const initialPositions = r.map(({ cubie }) => cubie.position.clone())

  // Compute the final rotations for all cubies
  const finalRotations = r.map(({ cubie }) => {
    const finalQuaternion = computeFinalRotation(rotationAxis, Math.PI / 2); // 90 degree rotation
    return cubie.rotation.clone().multiply(finalQuaternion);
  });

  onMount(() => {
    function animateFrame(timestamp: number) {
      if (startTime === null) {
        startTime = timestamp
      }
      const elapsedTime = (timestamp - startTime) / 1000

      const currentRotation = Utils.lerp(0, totalRotation, elapsedTime / durationInSeconds)

      r.forEach(({cubie, originalIndex}, idx) => {
        // let relativePosition = cubie.position.clone().sub(rotationCenter);
        let relativePosition = initialPositions[idx].clone().sub(rotationCenter);
        relativePosition = rotateAroundAxis(relativePosition, rotationAxis, currentRotation);
        cubies[originalIndex].position = relativePosition.add(rotationCenter)

        const newQuaternion = new THREE.Quaternion()
        newQuaternion.slerpQuaternions(initialRotations[idx], finalRotations[idx], elapsedTime / durationInSeconds)
        cubies[originalIndex].rotation = newQuaternion
      })


      if (elapsedTime < durationInSeconds) {
        requestAnimationFrame(animateFrame);
      } else {
        r.forEach(({cubie, originalIndex}, idx) => {
          // let relativePosition = cubie.position.clone().sub(rotationCenter);
          let relativePosition = initialPositions[idx].clone().sub(rotationCenter);
          relativePosition = rotateAroundAxis(relativePosition, rotationAxis, totalRotation);
          cubies[originalIndex].position = relativePosition.add(rotationCenter)

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

        <!-- rotation={[cubie.rotation.x, cubie.rotation.y, cubie.rotation.z]} -->
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