import { CubeWrapper } from '$lib/models/cubeWrapper'
import { writable } from 'svelte/store'

export const cubeState = writable(new CubeWrapper())