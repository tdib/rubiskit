<script lang='ts'>
  import { Cube } from '../lib/models/cube'
  import Net from '$lib/components/2d/Net.svelte'
  import Cube3D from '$lib/components/3d/Cube3D.svelte'
  import { Vector3 } from 'three'
  import { moveState } from '$lib/stores/cube3dState'
  import { turn } from '$lib/util/rotation'

  let is3d = true
  let cube = new Cube()

  function queueMove(move: Vector3, isClockwise: boolean = true) {
    moveState.update((state) => {
      state.moveQueue.push({ move: move, isClockwise: isClockwise })
      return { ...state }
    })
  }

  function handleKeyPress(e: KeyboardEvent) {
    // Main permutations
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'r') {
      if (e.shiftKey) {
        cube.RPrime()
        queueMove(new Vector3(1, 0, 0), false)
      } else {
        cube.R()
        queueMove(new Vector3(1, 0, 0))
      }
    } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'u') {
      if (e.shiftKey) {
        cube.UPrime()
        queueMove(new Vector3(0, 1, 0), false)
      } else {
        cube.U()
        queueMove(new Vector3(0, 1, 0))
      }
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'l') {
      if (e.shiftKey) {
        cube.LPrime()
        queueMove(new Vector3(-1, 0, 0), false)
      } else {
        cube.L()
        queueMove(new Vector3(-1, 0, 0))
      }
    } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'd') {
      if (e.shiftKey) {
        cube.DPrime()
        queueMove(new Vector3(0, -1, 0), false)
      } else {
        cube.D()
        queueMove(new Vector3(0, -1, 0))
      }
    } else if (e.key.toLowerCase() === 'f') {
      if (e.shiftKey) {
        cube.FPrime()
        queueMove(new Vector3(0, 0, 1), false)
      } else {
        cube.F()
        queueMove(new Vector3(0, 0, 1))
      }
    } else if (e.key.toLowerCase() === 'b') {
      if (e.shiftKey) {
        cube.BPrime()
        queueMove(new Vector3(0, 0, -1), false)
      } else {
        cube.B()
        queueMove(new Vector3(0, 0, -1))
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
