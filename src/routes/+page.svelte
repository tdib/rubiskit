<script lang='ts'>
  import Net from '$lib/components/2d/Net.svelte'
  import Cube3D from '$lib/components/3d/Cube3D.svelte'
  import { scramble } from '$lib/util/scramble'
  import { cubeState } from '$lib/stores/cubeState'

  let is3d = true

  scramble()

  function handleKeyPress(e: KeyboardEvent) {
    // Main permutations
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'r') {
      if (e.shiftKey) {
        $cubeState.RPrime()
      } else {
        $cubeState.R()
      }
    } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'u') {
      if (e.shiftKey) {
        $cubeState.UPrime()
      }
      else {
        $cubeState.U()
      }
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'l') {
      if (e.shiftKey) {
        $cubeState.LPrime()
      } else {
        $cubeState.L()
      }
    } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'd') {
      if (e.shiftKey) {
        $cubeState.DPrime()
      } else {
        $cubeState.D()
      }
    } else if (e.key.toLowerCase() === 'f') {
      if (e.shiftKey) {
        $cubeState.FPrime()
      } else {
        $cubeState.F()
      }
    } else if (e.key.toLowerCase() === 'b') {
      if (e.shiftKey) {
        $cubeState.BPrime()
      } else {
        $cubeState.B()
      }
    // Advanced moves
    } else if (e.key.toLowerCase() === 'm') {
      if (e.shiftKey) {
        $cubeState.mPrime()
      } else {
        $cubeState.m()
      }
    } else if (e.key.toLowerCase() === 'e') {
      if (e.shiftKey) {
        $cubeState.ePrime()
      } else {
        $cubeState.e()
      }
    } else if (e.key.toLowerCase() === 's') {
      if (e.shiftKey) {
        $cubeState.sPrime()
      } else {
        $cubeState.s()
      }
    // Rotations
    } else if (e.key.toLowerCase() === 'x') {
      if (e.shiftKey) {
        $cubeState.xPrime()
      } else {
        $cubeState.x()
      }
    } else if (e.key.toLowerCase() === 'y') {
      if (e.shiftKey) {
        $cubeState.yPrime()
      } else {
        $cubeState.y()
      }
    } else if (e.key.toLowerCase() === 'z') {
      if (e.shiftKey) {
        $cubeState.zPrime()
      } else {
        $cubeState.z()
      }
    }

    $cubeState.cube2d = $cubeState.cube2d
    console.log($cubeState.history);
  }
</script>

<!-- <div>
  <h1>Rubiskit</h1>
  <h2>(pronounced roo-biscuit, emphasis on the biscuit)</h2>
</div> -->

{#if is3d}
  <Cube3D />
{:else}
  <Net cube={$cubeState.cube2d} />
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
