import { Integer } from './integer'
import { Add, Gte, Sub } from './add'

type Mul<A extends Integer, B extends Integer> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [...infer Y extends number[], number]
  ? A[0] extends 0
    ? Mul<X, [0, ...Y]>
    : Add<B, Mul<X, [0, ...Y]>>
  : Integer.Zero
  : Integer.Zero

type SubMod<A extends Integer, B extends Integer, C extends number[], Q extends number[]> =
  | C extends Integer.Zero
  ? DivMod<A, B, C, [0, ...Q]>
  : Gte<A, C> extends 0
  ? DivMod<A, B, C, [0, ...Q]>
  : DivMod<Sub<A, C>, B, C, [1, ...Q]>

type DivMod<A extends Integer, B extends Integer, C extends number[] = Integer.Zero, Q extends number[] = []> =
  | B extends [infer X extends number, ...infer Y extends number[]]
  ? C extends [number, ...infer Z extends number[]]
  ? SubMod<A, Y, [...Z, X], Q>
  : [Q, A]
  : [Q, A]

export type mul<X extends number, Y extends number> = Integer.Decode<Mul<Integer.Encode<X>, Integer.Encode<Y>>>
export function mul<X extends number, Y extends number>(x: X, y: Y): mul<X, Y> {
  return (x * y) as any
}

export type divmod<X extends number, Y extends number> = 
  | DivMod<Integer.Encode<X>, Integer.Encode<Y>> extends [infer Q extends number[], infer R extends number[]]
  ? [Integer.Decode<Q>, Integer.Decode<R>]
  : never

export function divmod<X extends number, Y extends number>(x: X, y: Y): divmod<X, Y> {
  const r = x % y
  const q = (x - r) / y
  return [q, r] as any
}

export type div<X extends number, Y extends number> =
  | DivMod<Integer.Encode<X>, Integer.Encode<Y>> extends [infer Q extends number[], number[]]
  ? Integer.Decode<Q>
  : never

export function div<X extends number, Y extends number>(x: X, y: Y): div<X, Y> {
  return divmod(x, y)[0] as any
}

export type mod<X extends number, Y extends number> =
  | DivMod<Integer.Encode<X>, Integer.Encode<Y>> extends [number[], infer R extends number[]]
  ? Integer.Decode<R>
  : never

export function mod<X extends number, Y extends number>(x: X, y: Y): mod<X, Y> {
  return divmod(x, y)[1] as any
}
