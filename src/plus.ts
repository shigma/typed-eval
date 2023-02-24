import { ToBinary, ToDecimal } from './binary'

type Result = [[[0, 1], [1, 0]], [[1, 0], [0, 1]]]
type Carry = [[[0, 0], [0, 1]], [[0, 1], [1, 1]]]

type HalfAdd<B extends number[], C extends number, R extends number[] = []> = 
  | R['length'] extends 32
  ? R
  : B extends [number, ...infer X extends number[]]
  ? HalfAdd<X, Carry[0][B[0]][C], [...R, Result[0][B[0]][C]]>
  : C extends 0 ? [] : [1]

type FullAdd<A extends number[], B extends number[], C extends number = 0, R extends number[] = []> =
  | R['length'] extends 32
  ? R
  : A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? FullAdd<X, Y, Carry[A[0]][B[0]][C], [...R, Result[A[0]][B[0]][C]]>
  : HalfAdd<A, C>
  : HalfAdd<B, C>

export type Plus<X extends string | number, Y extends string | number> = ToDecimal<FullAdd<ToBinary<X>, ToBinary<Y>>>
