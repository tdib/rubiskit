import { test, expect, beforeEach } from 'vitest'
import { Cube2D } from '$lib/models/cube2d'

let cube2d: Cube2D
beforeEach(() => {
  cube2d = new Cube2D()
})

test('R U R\'', () => {
  expect(cube2d.R().U().RPrime().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['G', 'G', 'O']], // Up
    [['G', 'G', 'Y'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['R', 'R', 'W'], ['G', 'G', 'W'], ['G', 'G', 'G']], // Front
    [['B', 'R', 'R'], ['B', 'R', 'R'], ['W', 'R', 'R']], // Right
    [['B', 'O', 'O'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'R'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('R U R\' U\'', () => {
  expect(cube2d.R().U().RPrime().UPrime().state).toEqual([
    [['W', 'W', 'O'], ['W', 'W', 'G'], ['W', 'W', 'G']], // Up
    [['B', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'Y'], ['G', 'G', 'W'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'W'], ['B', 'R', 'R'], ['W', 'R', 'R']], // Right
    [['B', 'R', 'R'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'R'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('(R U R\' U\') x 6', () => {
  expect(cube2d.R().U().RPrime().UPrime()
    .R().U().RPrime().UPrime()
    .R().U().RPrime().UPrime()
    .R().U().RPrime().UPrime()
    .R().U().RPrime().UPrime()
    .R().U().RPrime().UPrime().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']], // Up
    [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('(R U) x 105', () => {
  expect(cube2d.R().U().R().U().R().U().R().U().R().U().R().U()
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

test('L\' U\' L', () => {
  expect(cube2d.LPrime().UPrime().L().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['R', 'G', 'G']], // Up
    [['O', 'O', 'B'], ['O', 'O', 'B'], ['O', 'O', 'W']], // Left
    [['W', 'O', 'O'], ['W', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['Y', 'G', 'G'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['R', 'R', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['O', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('L\' U\' L U', () => {
  expect(cube2d.LPrime().UPrime().L().U().state).toEqual([
    [['R', 'W', 'W'], ['G', 'W', 'W'], ['G', 'W', 'W']], // Up
    [['W', 'O', 'O'], ['O', 'O', 'B'], ['O', 'O', 'W']], // Left
    [['Y', 'G', 'G'], ['W', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'B'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['O', 'O', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['O', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('(L\' U\' L U) x 6', () => {
  expect(cube2d.LPrime().UPrime().L().U()
    .LPrime().UPrime().L().U()
    .LPrime().UPrime().L().U()
    .LPrime().UPrime().L().U()
    .LPrime().UPrime().L().U()
    .LPrime().UPrime().L().U().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']], // Up
    [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})
test('(L U) x 105', () => {
  expect(cube2d.L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']], // Up
    [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('(L U) x 105', () => {
  expect(cube2d.L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().L().U().L().U().L().U().L().U().L().U().L().U()
    .L().U().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']], // Up
    [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})

test('(R U R\' U\') (R\' F R2 U\' R\') U\' (R U R\' F\') - T Perm', () => {
  expect(cube2d.R().U().RPrime().UPrime().RPrime().F().R().R().UPrime()
    .RPrime().UPrime().R().U().RPrime().FPrime().state).toEqual([
    [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']], // Up
    [['O', 'R', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']], // Left
    [['G', 'G', 'R'], ['G', 'G', 'G'], ['G', 'G', 'G']], // Front
    [['B', 'O', 'G'], ['R', 'R', 'R'], ['R', 'R', 'R']], // Right
    [['R', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']], // Back
    [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']], // Down
  ])
})