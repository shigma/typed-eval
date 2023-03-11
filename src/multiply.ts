import { int32, Integer } from './integer'
import { numeric, PadEnd, PadStart, XorMap } from './utils'

declare module './integer' {
  namespace Integer {
    export type Mul<A extends Integer, B extends Integer, O extends Integer> =
      | A extends [...infer X extends number[], infer Z extends number]
      ? B extends [number, ...infer Y extends number[]]
      ? Z extends 0
        ? Mul<X, [...Y, 0], O>
        : Add<B, Mul<X, [...Y, 0], O>>
      : O
      : O

    type _DivMod<A extends Integer, B extends Integer, O extends Integer, C extends Integer = O, Q extends number[] = []> =
      | B extends [...infer X extends number[], infer Y extends number]
      ? C extends [...infer Z extends number[], number]
      ? [Y, ...Z] extends O
        ? _DivMod<A, X, O, [Y, ...Z], [...Q, 0]>
        : Gte<A, [Y, ...Z]> extends 0
        ? _DivMod<A, X, O, [Y, ...Z], [...Q, 0]>
        : _DivMod<Sub<A, [Y, ...Z]>, X, O, [Y, ...Z], [...Q, 1]>
      : [Q, A]
      : [Q, A]

    export type DivMod<A extends Integer, B extends Integer, O extends Integer> =
      | _DivMod<Flip<A, A[0]>, Flip<B, B[0]>, O> extends [infer Q extends Integer, infer R extends Integer]
      ? [Flip<Q, XorMap[A[0]][B[0]]>, Flip<R, A[0]>]
      : never
  }

  namespace int32 {
    export type mul<X extends numeric, Y extends numeric> = Decode<Integer.Mul<Encode<X>, Encode<Y>, Zero>>
    export type div<X extends numeric, Y extends numeric> = divmod<X, Y>[0]
    export type mod<X extends numeric, Y extends numeric> = divmod<X, Y>[1]
    export type divmod<X extends numeric, Y extends numeric> = 
      | Integer.DivMod<Encode<X>, Encode<Y>, Zero> extends [infer Q extends Integer, infer R extends Integer]
      ? [Decode<Q>, Decode<R>]
      : never
  }

  namespace int64 {
    export type mul<X extends numeric, Y extends numeric> = Decode<Integer.Mul<Encode<X>, Encode<Y>, Zero>>
    export type div<X extends numeric, Y extends numeric> = divmod<X, Y>[0]
    export type mod<X extends numeric, Y extends numeric> = divmod<X, Y>[1]
    export type divmod<X extends numeric, Y extends numeric> = 
      | Integer.DivMod<Encode<X>, Encode<Y>, Zero> extends [infer Q extends Integer, infer R extends Integer]
      ? [Decode<Q>, Decode<R>]
      : never
  }
}

export type mul<X extends number, Y extends number> = int32.mul<X, Y>
export function mul<X extends number, Y extends number>(x: X, y: Y): mul<X, Y> {
  return (x * y) as any
}

export type divmod<X extends number, Y extends number> = int32.divmod<X, Y>
export function divmod<X extends number, Y extends number>(x: X, y: Y): divmod<X, Y> {
  const r = x % y
  const q = (x - r) / y
  return [q, r] as any
}

export type div<X extends number, Y extends number> = int32.div<X, Y>
export function div<X extends number, Y extends number>(x: X, y: Y): div<X, Y> {
  return divmod(x, y)[0] as any
}

export type mod<X extends number, Y extends number> = int32.mod<X, Y>
export function mod<X extends number, Y extends number>(x: X, y: Y): mod<X, Y> {
  return divmod(x, y)[1] as any
}
