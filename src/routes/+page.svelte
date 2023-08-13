<script lang='ts'>
  import { Cube } from '../lib/models/cube'
  import Net from '$lib/components/2d/Net.svelte'
  import Cube3D from '$lib/components/3d/Cube3D.svelte'
  import type { Vector3 } from 'three'
  import { moveState } from '$lib/stores/cube3dState'
  import { turn } from '$lib/util/permutation'
  import { DIRECTIONS } from '$lib/models/cube3d'

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
        queueMove(DIRECTIONS.RIGHT, false)
      } else {
        cube.R()
        queueMove(DIRECTIONS.RIGHT)
      }
    } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'u') {
      if (e.shiftKey) {
        cube.UPrime()
        queueMove(DIRECTIONS.UP, false)
      } else {
        cube.U()
        queueMove(DIRECTIONS.UP)
      }
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'l') {
      if (e.shiftKey) {
        cube.LPrime()
        queueMove(DIRECTIONS.LEFT, false)
      } else {
        cube.L()
        queueMove(DIRECTIONS.LEFT)
      }
    } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'd') {
      if (e.shiftKey) {
        cube.DPrime()
        queueMove(DIRECTIONS.DOWN, false)
      } else {
        cube.D()
        queueMove(DIRECTIONS.DOWN)
      }
    } else if (e.key.toLowerCase() === 'f') {
      if (e.shiftKey) {
        cube.FPrime()
        queueMove(DIRECTIONS.FRONT, false)
      } else {
        cube.F()
        queueMove(DIRECTIONS.FRONT)
      }
    } else if (e.key.toLowerCase() === 'b') {
      if (e.shiftKey) {
        cube.BPrime()
        queueMove(DIRECTIONS.BACK, false)
      } else {
        cube.B()
        queueMove(DIRECTIONS.BACK)
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
