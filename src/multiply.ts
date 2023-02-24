import { ToBinary, ToDecimal } from './binary'
import { Add } from './plus'
import { Zero } from './utils'

type Times<A extends number[], B extends number[]> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [...infer Y extends number[], number]
  ? A[0] extends 0
    ? Times<X, [0, ...Y]>
    : Add<B, Times<X, [0, ...Y]>>
  : Zero
  : Zero

export type times<X extends number, Y extends number> = ToDecimal<Times<ToBinary<X>, ToBinary<Y>>>
export function times<X extends number, Y extends number>(x: X, y: Y): times<X, Y> {
  return (x * y) as any
}
