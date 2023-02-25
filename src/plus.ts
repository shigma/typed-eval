import { Complement, ToBinary, ToDecimal } from './binary'

type Result = [[[0, 1], [1, 0]], [[1, 0], [0, 1]]]
type Carry = [[[0, 0], [0, 1]], [[0, 1], [1, 1]]]

export type Add<A extends number[], B extends number[], C extends number = 0, R extends number[] = []> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? Add<X, Y, Carry[A[0]][B[0]][C], [...R, Result[A[0]][B[0]][C]]>
  : R
  : R

export type Sub<A extends number[], B extends number[]> = Add<A, Complement<B>>

export type add<X extends number, Y extends number> = ToDecimal<Add<ToBinary<X>, ToBinary<Y>>>
export function add<X extends number, Y extends number>(x: X, y: Y): add<X, Y> {
  return (x + y) as any
}

export type sub<X extends number, Y extends number> = ToDecimal<Add<ToBinary<X>, Complement<ToBinary<Y>>>>
export function sub<X extends number, Y extends number>(x: X, y: Y): sub<X, Y> {
  return (x - y) as any
}
