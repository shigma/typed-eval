import { int32 } from './integer'
import { AndMap, NotMap, numeric, OrMap, XorMap } from './utils'

declare module './integer' {
  export type HalfAdd<A extends Integer, B extends number, R extends number[] = []> =
    | A extends [...infer X extends number[], infer U extends number]
    ? HalfAdd<X, AndMap[U][B], [XorMap[U][B], ...R]>
    : R

  export type Add<A extends Integer, B extends Integer, C extends number = 0, R extends number[] = []> =
    | A extends [...infer X extends number[], infer U extends number]
    ? B extends [...infer Y extends number[], infer V extends number]
    ? Add<X, Y, [AndMap, OrMap][C][U][V], [XorMap[XorMap[U][V]][C], ...R]>
    : R
    : R

  export type Sub<A extends Integer, B extends Integer> = Add<A, Complement<B>>

  export type Eq<A extends Integer, B extends Integer> =
    | A extends [infer U extends number, ...infer X extends number[]]
    ? B extends [infer V extends number, ...infer Y extends number[]]
    ? XorMap[U][V] extends 0 ? Eq<X, Y> : 0
    : 1
    : 1

  export type Gt<A extends Integer, B extends Integer> =
    | A extends [infer U extends number, ...infer X extends number[]]
    ? B extends [infer V extends number, ...infer Y extends number[]]
    ? XorMap[U][V] extends 0 ? Gt<X, Y> : U
    : 0
    : 0

  export type Lt<A extends Integer, B extends Integer> = Gt<B, A>
  export type Ne<A extends Integer, B extends Integer> = NotMap[Eq<A, B>]
  export type Gte<A extends Integer, B extends Integer> = NotMap[Gt<B, A>]
  export type Lte<A extends Integer, B extends Integer> = NotMap[Gt<A, B>]

  namespace int32 {
    export type add<X extends numeric, Y extends numeric> = Decode<Add<Encode<X>, Encode<Y>>>
    export type sub<X extends numeric, Y extends numeric> = Decode<Sub<Encode<X>, Encode<Y>>>
    export type eq<X extends numeric, Y extends numeric> = Eq<Encode<X>, Encode<Y>>
    export type ne<X extends numeric, Y extends numeric> = Ne<Encode<X>, Encode<Y>>
    export type gt<X extends numeric, Y extends numeric> = Gt<Encode<X>, Encode<Y>>
    export type lt<X extends numeric, Y extends numeric> = Lt<Encode<X>, Encode<Y>>
    export type gte<X extends numeric, Y extends numeric> = Gte<Encode<X>, Encode<Y>>
    export type lte<X extends numeric, Y extends numeric> = Lte<Encode<X>, Encode<Y>>
  }

  namespace int64 {
    export type add<X extends numeric, Y extends numeric> = Decode<Add<Encode<X>, Encode<Y>>>
    export type sub<X extends numeric, Y extends numeric> = Decode<Sub<Encode<X>, Encode<Y>>>
    export type eq<X extends numeric, Y extends numeric> = Eq<Encode<X>, Encode<Y>>
    export type ne<X extends numeric, Y extends numeric> = Ne<Encode<X>, Encode<Y>>
    export type gt<X extends numeric, Y extends numeric> = Gt<Encode<X>, Encode<Y>>
    export type lt<X extends numeric, Y extends numeric> = Lt<Encode<X>, Encode<Y>>
    export type gte<X extends numeric, Y extends numeric> = Gte<Encode<X>, Encode<Y>>
    export type lte<X extends numeric, Y extends numeric> = Lte<Encode<X>, Encode<Y>>
  }
}

export type add<X extends number, Y extends number> = int32.add<X, Y>
export function add<X extends number, Y extends number>(x: X, y: Y): add<X, Y> {
  return (x + y) as any
}

export type sub<X extends number, Y extends number> = int32.sub<X, Y>
export function sub<X extends number, Y extends number>(x: X, y: Y): sub<X, Y> {
  return (x - y) as any
}

export type eq<X extends number, Y extends number> = int32.eq<X, Y>
export function eq<X extends number, Y extends number>(x: X, y: Y): eq<X, Y> {
  return +(x as any === y) as any
}

export type ne<X extends number, Y extends number> = int32.ne<X, Y>
export function ne<X extends number, Y extends number>(x: X, y: Y): ne<X, Y> {
  return +(x as any !== y) as any
}

export type gt<X extends number, Y extends number> = int32.gt<X, Y>
export function gt<X extends number, Y extends number>(x: X, y: Y): gt<X, Y> {
  return +(x > y) as any
}

export type gte<X extends number, Y extends number> = int32.gte<X, Y>
export function gte<X extends number, Y extends number>(x: X, y: Y): gte<X, Y> {
  return +(x >= y) as any
}

export type lt<X extends number, Y extends number> = int32.lt<X, Y>
export function lt<X extends number, Y extends number>(x: X, y: Y): lt<X, Y> {
  return +(x < y) as any
}

export type lte<X extends number, Y extends number> = int32.lte<X, Y>
export function lte<X extends number, Y extends number>(x: X, y: Y): lte<X, Y> {
  return +(x <= y) as any
}
