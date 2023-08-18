<script lang='ts'>
  import Net from '$lib/components/2d/Net.svelte'
  import Cube3D from '$lib/components/3d/Cube3D.svelte'
  import { scramble } from '$lib/util/scramble'
  import { naiveSolve, isSolved } from '$lib/util/solve'
  import { cubeState } from '$lib/stores/cubeState'
  import { Lightbulb, LightbulbOff } from 'lucide-svelte'
  import { onMount } from 'svelte'

  let is3d = true

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
    isSolved()
  }

  // Set initial theme based on user's preference in localstorage
  let theme: string | null = null
  onMount(() => {
    theme = localStorage.getItem('theme')
    if (!theme) {
      let darkScheme = window.matchMedia('(prefers-color-scheme: dark)')
      theme = darkScheme.matches ? 'dark' : 'light'
      localStorage.setItem('theme', theme)
    }
    document.body.classList.add(theme)
  })

  // When the user toggles the theme, set in localstorage
  function toggleTheme() {
    // Determine what the current and switching theme is
    const currTheme = localStorage.getItem('theme');
    const newTheme = currTheme === 'dark' ? 'light' : 'dark'

    // Set theme in body class list and localstorage
    if (currTheme) {
      document.body.classList.remove(currTheme)
    }

    document.body.classList.toggle(newTheme);
    localStorage.setItem('theme', newTheme)
    theme = localStorage.getItem('theme')
  }

</script>

<div class='header'>
  <h1>Rubiskit</h1>
  <h2>(pronounced roo-biscuit, emphasis on the biscuit)</h2>
</div>

<button class='buttons top-right' on:click={toggleTheme}>
  {#if theme === 'dark'}
    <Lightbulb size={45} />
  {:else}
    <LightbulbOff size={45} />
  {/if}
</button>

<div class='buttons bottom-right'>
  <button on:click={() => scramble(20)}>Scramble!</button>
  <button on:click={() => {
    naiveSolve()
    $cubeState.cube2d = $cubeState.cube2d
  }}>Naive Solve</button>
  {#if is3d}
    <button on:click={() => is3d = false}>2D Version</button>
  {:else}
    <button on:click={() => is3d = true}>3D Version</button>
  {/if}
</div>

{#if is3d}
  <Cube3D />
{:else}
  <Net cube={$cubeState.cube2d} />
{/if}

<svelte:window on:keydown={handleKeyPress} />

<style lang='scss'>
  h1, h2 {
    margin: 0;
  }

  .header {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block-start: 3em;
    color: var(--text);
  }

  .top-right {
    position: absolute;
    top: 1em;
    right: 1em;
    background: none;
    border: none;
    color: var(--text);
  }

  .bottom-right {
    position: absolute;
    width: fit-content;
    bottom: 2em;
    right: 2em;
    display: flex;
    flex-direction: row;
    gap: 2em;
  }

  button {
    width: fit-content;
    color: var(--surface-text);
    background-color: var(--surface);
    border: none;
    border-radius: 0.5em;
    padding: 0.5em 1em;
    font-size: 1.25em;
    font-weight: bold;
    cursor: pointer;
  }

</style>
