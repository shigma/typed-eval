import { ToBinary, ToDecimal } from './binary'
import { Add, Gte, Sub } from './add'
import { Zero } from './utils'

type Mul<A extends number[], B extends number[]> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [...infer Y extends number[], number]
  ? A[0] extends 0
    ? Mul<X, [0, ...Y]>
    : Add<B, Mul<X, [0, ...Y]>>
  : Zero
  : Zero

type SubMod<A extends number[], B extends number[], C extends number[], Q extends number[]> =
  | C extends Zero
  ? DivMod<A, B, C, [0, ...Q]>
  : Gte<A, C> extends 0
  ? DivMod<A, B, C, [0, ...Q]>
  : DivMod<Sub<A, C>, B, C, [1, ...Q]>

type DivMod<A extends number[], B extends number[], C extends number[] = Zero, Q extends number[] = []> =
  | B extends [infer X extends number, ...infer Y extends number[]]
  ? C extends [number, ...infer Z extends number[]]
  ? SubMod<A, Y, [...Z, X], Q>
  : [Q, A]
  : [Q, A]

export type mul<X extends number, Y extends number> = ToDecimal<Mul<ToBinary<X>, ToBinary<Y>>>
export function mul<X extends number, Y extends number>(x: X, y: Y): mul<X, Y> {
  return (x * y) as any
}

export type divmod<X extends number, Y extends number> = 
  | DivMod<ToBinary<X>, ToBinary<Y>> extends [infer Q extends number[], infer R extends number[]]
  ? [ToDecimal<Q>, ToDecimal<R>]
  : never

export function divmod<X extends number, Y extends number>(x: X, y: Y): divmod<X, Y> {
  const r = x % y
  const q = (x - r) / y
  return [q, r] as any
}

export type div<X extends number, Y extends number> =
  | DivMod<ToBinary<X>, ToBinary<Y>> extends [infer Q extends number[], number[]]
  ? ToDecimal<Q>
  : never

export function div<X extends number, Y extends number>(x: X, y: Y): div<X, Y> {
  return divmod(x, y)[0] as any
}

export type mod<X extends number, Y extends number> =
  | DivMod<ToBinary<X>, ToBinary<Y>> extends [number[], infer R extends number[]]
  ? ToDecimal<R>
  : never

export function mod<X extends number, Y extends number>(x: X, y: Y): mod<X, Y> {
  return divmod(x, y)[1] as any
}
