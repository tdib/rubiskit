<script lang='ts'>
  import type { Cube, Direction } from '$lib/models/cube'
	import { DIRECTIONS } from '$lib/models/cube'
  import Face from './Face.svelte'

  export let cube: Cube


  // Determine where the positioning of each face should be
  const { UP, LEFT, FRONT, RIGHT, BACK, DOWN } = DIRECTIONS
  let netGridCells: (Direction | null)[][] = [
    [null, UP, null, null],
    [LEFT, FRONT, RIGHT, BACK],
    [null, DOWN, null, null],
  ]
</script>

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

<style lang='scss'>
  .net {
    margin: 10em auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1em;
    width: max-content;
  }
</style>