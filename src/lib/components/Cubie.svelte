<script lang='ts'>
  import { T } from '@threlte/core'
  import * as THREE from 'three'

  export let position: [number, number, number] = [0, 0, 0]
  export let rotation: THREE.Euler

  export let colour1: THREE.Color | null = null // Right
  export let colour2: THREE.Color | null = null // Left
  export let colour3: THREE.Color | null = null // Up
  export let colour4: THREE.Color | null = null // Down
  export let colour5: THREE.Color | null = null // Front
  export let colour6: THREE.Color | null = null // Back

  let defaultColour = new THREE.Color('#111111')
  let scale = 0.8
</script>

<T.Mesh position={position} rotation={rotation.toArray()} scale={scale}>
  <T.BoxGeometry />

  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour1 ?? defaultColour}/>

  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour2 ?? defaultColour}/>

  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour3 ?? defaultColour}/>

  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour4 ?? defaultColour}/>

  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour5 ?? defaultColour}/>

  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour6 ?? defaultColour} />

</T.Mesh>



