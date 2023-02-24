import { ToBinary, ToDecimal } from './binary'

type Result = [[[0, 1], [1, 0]], [[1, 0], [0, 1]]]
type Carry = [[[0, 0], [0, 1]], [[0, 1], [1, 1]]]

type HalfAdd<B extends number[], C extends number> = 
  | B extends [number, ...infer X extends number[]]
  ? [Result[0][B[0]][C], ...HalfAdd<X, Carry[0][B[0]][C]>]
  : C extends 0 ? [] : [1]

type FullAdd<A extends number[], B extends number[], C extends number = 0> =
  | A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? [Result[A[0]][B[0]][C], ...FullAdd<X, Y, Carry[A[0]][B[0]][C]>]
  : HalfAdd<A, C>
  : HalfAdd<B, C>

export type Trim<A extends number[]> =
  | A['length'] extends 33
  ? A extends [...infer X extends number[], number] ? X : A
  : A

export type Plus<X extends string | number, Y extends string | number> = ToDecimal<Trim<FullAdd<ToBinary<X>, ToBinary<Y>>>>
