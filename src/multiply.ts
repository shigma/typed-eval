import { Flip, Int32, Integer, Sign } from './integer'
import { Add, Gte, Sub } from './add'
import { XorMap } from './utils'

type Mul<A extends Integer, B extends Integer, O extends Integer> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [...infer Y extends number[], number]
  ? A[0] extends 0
    ? Mul<X, [0, ...Y], O>
    : Add<B, Mul<X, [0, ...Y], O>>
  : O
  : O

type SubMod<A extends Integer, B extends Integer, O extends Integer, C extends Integer, Q extends number[]> =
  | C extends O
  ? _DivMod<A, B, O, C, [0, ...Q]>
  : Gte<A, C> extends 0
  ? _DivMod<A, B, O, C, [0, ...Q]>
  : _DivMod<Sub<A, C>, B, O, C, [1, ...Q]>

type _DivMod<A extends Integer, B extends Integer, O extends Integer, C extends Integer = O, Q extends number[] = []> =
  | B extends [infer X extends number, ...infer Y extends number[]]
  ? C extends [number, ...infer Z extends number[]]
  ? SubMod<A, Y, O, [...Z, X], Q>
  : [Q, A]
  : [Q, A]

type DivMod<A extends Integer, B extends Integer, O extends Integer> =
  | _DivMod<Flip<A, Sign<A>>, Flip<B, Sign<B>>, O> extends [infer Q extends Integer, infer R extends Integer]
  ? [Flip<Q, XorMap[Sign<A>][Sign<B>]>, Flip<R, Sign<A>>]
  : never

export type mul<X extends number, Y extends number> = Int32.Decode<Mul<Int32.Encode<X>, Int32.Encode<Y>, Int32.Zero>>
export function mul<X extends number, Y extends number>(x: X, y: Y): mul<X, Y> {
  return (x * y) as any
}

export type divmod<X extends number, Y extends number> = 
  | DivMod<Int32.Encode<X>, Int32.Encode<Y>, Int32.Zero> extends [infer Q extends Integer, infer R extends Integer]
  ? [Int32.Decode<Q>, Int32.Decode<R>]
  : never

export function divmod<X extends number, Y extends number>(x: X, y: Y): divmod<X, Y> {
  const r = x % y
  const q = (x - r) / y
  return [q, r] as any
}

export type div<X extends number, Y extends number> = divmod<X, Y>[0]
export function div<X extends number, Y extends number>(x: X, y: Y): div<X, Y> {
  return divmod(x, y)[0] as any
}

export type mod<X extends number, Y extends number> = divmod<X, Y>[1]
export function mod<X extends number, Y extends number>(x: X, y: Y): mod<X, Y> {
  return divmod(x, y)[1] as any
}
