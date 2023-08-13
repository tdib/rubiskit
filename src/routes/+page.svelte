<script lang='ts'>
  import { Cube } from '../lib/models/cube'
  import Net from '$lib/components/2d/Net.svelte'
  import Cube3D from '$lib/components/3d/Cube3D.svelte'
  import { Cube3D as Cube3DClass } from '$lib/models/cube3d'

  let is3d = true
  let cube = new Cube()
  let cube3d = new Cube3DClass()

  function handleKeyPress(e: KeyboardEvent) {
    // Main permutations
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'r') {
      if (e.shiftKey) {
        cube.RPrime()
        cube3d.RPrime()
      } else {
        cube.R()
        cube3d.R()
      }
    } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'u') {
      if (e.shiftKey) {
        cube.UPrime()
        cube3d.UPrime()
      }
      else {
        cube.U()
        cube3d.U()
      }
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'l') {
      if (e.shiftKey) {
        cube.LPrime()
        cube3d.LPrime()
      } else {
        cube.L()
        cube3d.L()
      }
    } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'd') {
      if (e.shiftKey) {
        cube.DPrime()
        cube3d.DPrime()
      } else {
        cube.D()
        cube3d.D()
      }
    } else if (e.key.toLowerCase() === 'f') {
      if (e.shiftKey) {
        cube.FPrime()
        cube3d.FPrime()
      } else {
        cube.F()
        cube3d.F()
      }
    } else if (e.key.toLowerCase() === 'b') {
      if (e.shiftKey) {
        cube.BPrime()
        cube3d.BPrime()
      } else {
        cube.B()
        cube3d.B()
      }
    // Advanced moves
    } else if (e.key.toLowerCase() === 'm') {
      if (e.shiftKey) {
        cube.mPrime()
        cube3d.mPrime()
      } else {
        cube.m()
        cube3d.m()
      }
    } else if (e.key.toLowerCase() === 'e') {
      if (e.shiftKey) {
        cube.ePrime()
        cube3d.ePrime()
      } else {
        cube.e()
        cube3d.e()
      }
    } else if (e.key.toLowerCase() === 's') {
      if (e.shiftKey) {
        cube.sPrime()
        cube3d.sPrime()
      } else {
        cube.s()
        cube3d.s()
      }
    // Rotations
    } else if (e.key.toLowerCase() === 'x') {
      if (e.shiftKey) {
        cube.xPrime()
        cube3d.xPrime()
      } else {
        cube.x()
        cube3d.x()
      }
    } else if (e.key.toLowerCase() === 'y') {
      if (e.shiftKey) {
        cube.yPrime()
        cube3d.yPrime()
      } else {
        cube.y()
        cube3d.y()
      }
    } else if (e.key.toLowerCase() === 'z') {
      if (e.shiftKey) {
        cube.zPrime()
        cube3d.zPrime()
      } else {
        cube.z()
        cube3d.z()
      }
    }

    cube = cube
  }
</script>

<!-- <div>
  <h1>Rubiskit</h1>
  <h2>(pronounced roo-biscuit, emphasis on the biscuit)</h2>
</div> -->

{#if is3d}
  <Cube3D />
{:else}
  <Net cube={cube} />
{/if}

<svelte:window on:keydown={handleKeyPress}/>

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
