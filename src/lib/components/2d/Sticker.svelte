<script lang='ts'>
  import { COLOURS } from '$lib/models/cube'
  import type { StickerColour } from '$lib/models/cube'
  export let sticker: StickerColour
</script>

<div class='sticker' style='--colour: {COLOURS[sticker]}'/>

<style lang='scss'>
  .sticker {
    aspect-ratio: 1/1;
    background-color: var(--colour);
    width: 5em;
    height: 5em;
    outline: 1px solid black;
  }
</style>