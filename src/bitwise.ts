import { Int32 } from './integer'
import { AndMap, OrMap, XorMap } from './utils'

declare module './integer' {
  export type And<A extends Integer, B extends Integer, R extends number[] = []> =
    | A extends [number, ...infer X extends number[]]
    ? B extends [number, ...infer Y extends number[]]
    ? And<X, Y, [...R, AndMap[A[0]][B[0]]]>
    : R
    : R

  export type Or<A extends Integer, B extends Integer, R extends number[] = []> =
    | A extends [number, ...infer X extends number[]]
    ? B extends [number, ...infer Y extends number[]]
    ? Or<X, Y, [...R, OrMap[A[0]][B[0]]]>
    : R
    : R

  export type Xor<A extends Integer, B extends Integer, R extends number[] = []> =
    | A extends [number, ...infer X extends number[]]
    ? B extends [number, ...infer Y extends number[]]
    ? Xor<X, Y, [...R, XorMap[A[0]][B[0]]]>
    : R
    : R

  export type LShift<A extends Integer, B extends number, C extends number[] = []> =
    | C['length'] extends B
    ? A
    : A extends [number, ...infer X extends number[]]
    ? LShift<[...X, 0], B, [...C, 0]>
    : never

  export type RShift<A extends Integer, B extends number, C extends number[] = []> =
    | C['length'] extends B
    ? A
    : A extends [...infer X extends number[], number]
    ? RShift<[A[0], ...X], B, [...C, 0]>
    : never

  export type URShift<A extends Integer, B extends number, C extends number[] = []> =
    | C['length'] extends B
    ? A
    : A extends [...infer X extends number[], number]
    ? RShift<[0, ...X], B, [...C, 0]>
    : never

  namespace Int32 {
    export type and<X extends number, Y extends number> = Decode<And<Encode<X>, Encode<Y>>>
    export type or<X extends number, Y extends number> = Decode<Or<Encode<X>, Encode<Y>>>
    export type xor<X extends number, Y extends number> = Decode<Xor<Encode<X>, Encode<Y>>>
    export type lshift<X extends number, Y extends number> = Decode<LShift<Encode<X>, Y>>
    export type rshift<X extends number, Y extends number> = Decode<RShift<Encode<X>, Y>>
    export type urshift<X extends number, Y extends number> = Decode<URShift<Encode<X>, Y>>
  }

  namespace Int64 {
    export type and<X extends number, Y extends number> = Decode<And<Encode<X>, Encode<Y>>>
    export type or<X extends number, Y extends number> = Decode<Or<Encode<X>, Encode<Y>>>
    export type xor<X extends number, Y extends number> = Decode<Xor<Encode<X>, Encode<Y>>>
    export type lshift<X extends number, Y extends number> = Decode<LShift<Encode<X>, Y>>
    export type rshift<X extends number, Y extends number> = Decode<RShift<Encode<X>, Y>>
    export type urshift<X extends number, Y extends number> = Decode<URShift<Encode<X>, Y>>
  }
}

export type and<X extends number, Y extends number> = Int32.and<X, Y>
export function and<X extends number, Y extends number>(x: X, y: Y): and<X, Y> {
  return (x & y) as any
}

export type or<X extends number, Y extends number> = Int32.or<X, Y>
export function or<X extends number, Y extends number>(x: X, y: Y): or<X, Y> {
  return (x | y) as any
}

export type xor<X extends number, Y extends number> = Int32.xor<X, Y>
export function xor<X extends number, Y extends number>(x: X, y: Y): xor<X, Y> {
  return (x ^ y) as any
}

export type lshift<X extends number, Y extends number> = Int32.lshift<X, Y>
export function lshift<X extends number, Y extends number>(x: X, y: Y): lshift<X, Y> {
  return (x << y) as any
}

export type rshift<X extends number, Y extends number> = Int32.rshift<X, Y>
export function rshift<X extends number, Y extends number>(x: X, y: Y): rshift<X, Y> {
  return (x >> y) as any
}

export type urshift<X extends number, Y extends number> = Int32.urshift<X, Y>
export function urshift<X extends number, Y extends number>(x: X, y: Y): urshift<X, Y> {
  return (x >>> y) as any
}
