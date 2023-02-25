import { Integer } from './integer'
import { AndMap, OrMap, XorMap } from './utils'

export type Add<A extends Integer, B extends Integer, C extends number = 0, R extends number[] = []> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? Add<X, Y, [AndMap, OrMap][C][A[0]][B[0]], [...R, XorMap[XorMap[C][A[0]]][B[0]]]>
  : R
  : R

export type Sub<A extends Integer, B extends Integer> = Add<A, Integer.Complement<B>>

export type Eq<A extends Integer, B extends Integer> =
  | A extends [...infer X extends number[], infer U extends number]
  ? B extends [...infer Y extends number[], infer V extends number]
  ? XorMap[U][V] extends 0 ? Eq<X, Y> : 0
  : 1
  : 1

export type Ne<A extends Integer, B extends Integer> =
  | A extends [...infer X extends number[], infer U extends number]
  ? B extends [...infer Y extends number[], infer V extends number]
  ? XorMap[U][V] extends 0 ? Ne<X, Y> : 1
  : 0
  : 0

export type Gt<A extends Integer, B extends Integer> =
  | A extends [...infer X extends number[], infer U extends number]
  ? B extends [...infer Y extends number[], infer V extends number]
  ? XorMap[U][V] extends 0 ? Gt<X, Y> : U
  : 0
  : 0

export type Gte<A extends Integer, B extends Integer> =
  | A extends [...infer X extends number[], infer U extends number]
  ? B extends [...infer Y extends number[], infer V extends number]
  ? XorMap[U][V] extends 0 ? Gte<X, Y> : U
  : 1
  : 1

export type Lt<A extends Integer, B extends Integer> = Gt<B, A>
export type Lte<A extends Integer, B extends Integer> = Gte<B, A>

export type add<X extends number, Y extends number> = Integer.Decode<Add<Integer.Encode<X>, Integer.Encode<Y>>>
export function add<X extends number, Y extends number>(x: X, y: Y): add<X, Y> {
  return (x + y) as any
}

export type sub<X extends number, Y extends number> = Integer.Decode<Sub<Integer.Encode<X>, Integer.Encode<Y>>>
export function sub<X extends number, Y extends number>(x: X, y: Y): sub<X, Y> {
  return (x - y) as any
}

export type eq<X extends number, Y extends number> = Eq<Integer.Encode<X>, Integer.Encode<Y>>
export function eq<X extends number, Y extends number>(x: X, y: Y): eq<X, Y> {
  return +(x as any === y) as any
}

export type ne<X extends number, Y extends number> = Ne<Integer.Encode<X>, Integer.Encode<Y>>
export function ne<X extends number, Y extends number>(x: X, y: Y): ne<X, Y> {
  return +(x as any !== y) as any
}

export type gt<X extends number, Y extends number> = Gt<Integer.Encode<X>, Integer.Encode<Y>>
export function gt<X extends number, Y extends number>(x: X, y: Y): gt<X, Y> {
  return +(x > y) as any
}

export type gte<X extends number, Y extends number> = Gte<Integer.Encode<X>, Integer.Encode<Y>>
export function gte<X extends number, Y extends number>(x: X, y: Y): gte<X, Y> {
  return +(x >= y) as any
}

export type lt<X extends number, Y extends number> = Lt<Integer.Encode<X>, Integer.Encode<Y>>
export function lt<X extends number, Y extends number>(x: X, y: Y): lt<X, Y> {
  return +(x < y) as any
}

export type lte<X extends number, Y extends number> = Lte<Integer.Encode<X>, Integer.Encode<Y>>
export function lte<X extends number, Y extends number>(x: X, y: Y): lte<X, Y> {
  return +(x <= y) as any
}
