<script lang='ts'>
  import type { Cube2D } from '$lib/models/cube2d'
	import { DIRECTIONS } from '$lib/models/cube2d'
  import Face from './Face.svelte'

  export let cube: Cube2D

  // Determine where the positioning of each face should be
  const { UP, LEFT, FRONT, RIGHT, BACK, DOWN } = DIRECTIONS
  type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS]
  let netGridCells: (Direction | null)[][] = [
    [null, UP, null, null],
    [LEFT, FRONT, RIGHT, BACK],
    [null, DOWN, null, null],
  ]
</script>

<div class='container'>
  <div class='net'>
    {#each netGridCells as gridRow}
      {#each gridRow as face}
        {#if face !== null}
          <Face face={cube.state[face]} />
        {:else}
          <div />
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style lang='scss'>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .net {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1em;
    width: max-content;
  }
  
</style>