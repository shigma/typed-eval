import { AndMap, OrMap, ToBinary, ToDecimal, XorMap } from './binary'

export type And<A extends number[], B extends number[]> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? [AndMap[A[0]][B[0]], ...And<X, Y>]
  : []
  : []

export type Or<A extends number[], B extends number[]> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? [OrMap[A[0]][B[0]], ...Or<X, Y>]
  : []
  : []

export type Xor<A extends number[], B extends number[]> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? [XorMap[A[0]][B[0]], ...Xor<X, Y>]
  : []
  : []

export type LShift<A extends number[], B extends number, C extends number[] = []> =
  | C['length'] extends B
  ? A
  : A extends [number, ...infer X extends number[]]
  ? LShift<[...X, 0], B, [...C, 0]>
  : never

export type RShift<A extends number[], B extends number, C extends number[] = []> =
  | C['length'] extends B
  ? A
  : A extends [...infer X extends number[], number]
  ? RShift<[A[0], ...X], B, [...C, 0]>
  : never

export type URShift<A extends number[], B extends number, C extends number[] = []> =
  | C['length'] extends B
  ? A
  : A extends [...infer X extends number[], number]
  ? RShift<[0, ...X], B, [...C, 0]>
  : never

export type and<X extends number, Y extends number> = ToDecimal<And<ToBinary<X>, ToBinary<Y>>>
export function and<X extends number, Y extends number>(x: X, y: Y): and<X, Y> {
  return (x & y) as any
}

export type or<X extends number, Y extends number> = ToDecimal<Or<ToBinary<X>, ToBinary<Y>>>
export function or<X extends number, Y extends number>(x: X, y: Y): or<X, Y> {
  return (x | y) as any
}

export type xor<X extends number, Y extends number> = ToDecimal<Xor<ToBinary<X>, ToBinary<Y>>>
export function xor<X extends number, Y extends number>(x: X, y: Y): xor<X, Y> {
  return (x ^ y) as any
}

export type lshift<X extends number, Y extends number> = ToDecimal<LShift<ToBinary<X>, Y>>
export function lshift<X extends number, Y extends number>(x: X, y: Y): lshift<X, Y> {
  return (x << y) as any
}

export type rshift<X extends number, Y extends number> = ToDecimal<RShift<ToBinary<X>, Y>>
export function rshift<X extends number, Y extends number>(x: X, y: Y): rshift<X, Y> {
  return (x >> y) as any
}

export type urshift<X extends number, Y extends number> = ToDecimal<URShift<ToBinary<X>, Y>>
export function urshift<X extends number, Y extends number>(x: X, y: Y): urshift<X, Y> {
  return (x >>> y) as any
}
