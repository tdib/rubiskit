<script lang='ts'>
  import { Cube } from '../lib/models/cube'
  import Net from '$lib/components/Net.svelte'

  let cube = new Cube()

  function handleKeyPress(e: KeyboardEvent) {
    // Main permutations
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'r') {
      if (e.shiftKey) {
        cube.RPrime()
      } else {
        cube.R()
      }
    } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'u') {
      if (e.shiftKey) {
        cube.UPrime()
      } else {
        cube.U()
      }
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'l') {
      if (e.shiftKey) {
        cube.LPrime()
      } else {
        cube.L()
      }
    } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'd') {
      if (e.shiftKey) {
        cube.DPrime()
      } else {
        cube.D()
      }
    } else if (e.key.toLowerCase() === 'f') {
      if (e.shiftKey) {
        cube.FPrime()
      } else {
        cube.F()
      }
    } else if (e.key.toLowerCase() === 'b') {
      if (e.shiftKey) {
        cube.BPrime()
      } else {
        cube.B()
      }
    // Advanced moves
    } else if (e.key.toLowerCase() === 'm') {
      if (e.shiftKey) {
        cube.mPrime()
      } else {
        cube.m()
      }
    } else if (e.key.toLowerCase() === 'e') {
      if (e.shiftKey) {
        cube.ePrime()
      } else {
        cube.e()
      }
    } else if (e.key.toLowerCase() === 's') {
      if (e.shiftKey) {
        cube.sPrime()
      } else {
        cube.s()
      }
    // Rotations
    } else if (e.key.toLowerCase() === 'x') {
      if (e.shiftKey) {
        cube.xPrime()
      } else {
        cube.x()
      }
    } else if (e.key.toLowerCase() === 'y') {
      if (e.shiftKey) {
        cube.yPrime()
      } else {
        cube.y()
      }
    } else if (e.key.toLowerCase() === 'z') {
      if (e.shiftKey) {
        cube.zPrime()
      } else {
        cube.z()
      }
    }

    cube = cube
  }
</script>

<div>
  <h1>Rubiskit</h1>
  <h2>(pronounced roo-biscuit, emphasis on the biscuit)</h2>
</div>
<svelte:window on:keydown={handleKeyPress}/>
<Net cube={cube} />

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
