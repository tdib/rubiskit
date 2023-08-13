<script lang='ts'>
  import type { Face } from '$lib/models/cube'
  import Sticker from './Sticker.svelte'
  
  export let face: Face
</script>

<div class='face'>
  {#each face as row}
    {#each row as sticker}
      <Sticker sticker={sticker} />
    {/each}
  {/each}
</div>

<style lang='scss'>
  .face {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: .25em;
    width: max-content;
  }
</style>