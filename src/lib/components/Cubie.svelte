<script lang='ts'>
  import { Canvas, T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
  import * as THREE from 'three'

  export let position: [number, number, number] = [0, 0, 0]
  export let rotation: [number, number, number] = [0, 0, 0]

  export let colour1: THREE.Color = new THREE.Color('#000000')
  export let colour2: THREE.Color | null = null
  export let colour3: THREE.Color | null = null

  let defaultColour = new THREE.Color('#111111')
  let scale = 0.8
</script>

<T.Mesh position={position} rotation={rotation} scale={scale}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={defaultColour}/>
  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour3 ?? defaultColour}/>
  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour2 ?? defaultColour}/>
  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={defaultColour}/>
  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={defaultColour}/>
  <T.MeshStandardMaterial attach={(parent, self) => {
    if (Array.isArray(parent.material)) parent.material = [...parent.material, self]
    else parent.material = [self]
  }} color={colour1 ?? defaultColour} />
</T.Mesh>



