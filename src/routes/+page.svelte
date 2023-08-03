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
    } else if (e.key === 'ArrowLeft') {
      if (e.shiftKey) {
        cube.LPrime()
      } else {
        cube.L()
      }
    } else if (e.key === 'ArrowDown') {
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
    }

    cube = cube
    count ++
  }
</script>

<svelte:window on:keyup={handleKeyPress}/>
<Net cube={cube} />

<style lang='scss'>

</style>
