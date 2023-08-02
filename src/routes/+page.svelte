<script lang='ts'>
  import { Cube } from '../lib/models/cube'
  import Net from '$lib/components/Net.svelte'

  let cube = new Cube()
  let count = 0

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      if (e.shiftKey) {
        cube.RPrime()
      } else {
        cube.R()
      }
    } else if (e.key === 'ArrowUp') {
      if (e.shiftKey) {
        cube.UPrime()
      } else {
        cube.U()
      }
    }
    cube = cube
    count ++
  }
</script>

<svelte:window on:keyup={handleKeyPress}/>
<Net cube={cube} />

<style lang='scss'>

</style>
