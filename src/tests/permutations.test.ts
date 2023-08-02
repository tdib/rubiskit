import { test, expect, beforeEach } from 'vitest'
import { Cube } from '$lib/models/cube'

let cube: Cube
beforeEach(() => {
  cube = new Cube()
})

test('R U R\'', () => {
  expect(cube.R().U().RPrime().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['G', 'G', 'O']], // Up
    [['G', 'G', 'Y'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['R', 'R', 'W'], ['G', 'G', 'W'], ['G', 'G', 'G']], // Front
    [['B', 'R', 'R'], ['B', 'R', 'R'], ['W', 'R', 'R']], // Right
    [['B', 'O', 'O'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'R'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('R U R\' U\'', () => {
  expect(cube.R().U().RPrime().UPrime().state).toEqual([
    [['W', 'W', 'O'], ['W', 'W', 'G'], ['W', 'W', 'G']], // Up
    [['B', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'Y'], ['G', 'G', 'W'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'W'], ['B', 'R', 'R'], ['W', 'R', 'R']], // Right
    [['B', 'R', 'R'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'R'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('(R U) x 105', () => {
  expect(cube.R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().R().U().R().U().R().U().R().U().R().U().R().U()
    .R().U().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']], // Up
    [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})