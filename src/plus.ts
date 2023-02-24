import { Complement, ToBinary, ToDecimal } from './binary'
import { Zero } from './utils'

type Result = [[[0, 1], [1, 0]], [[1, 0], [0, 1]]]
type Carry = [[[0, 0], [0, 1]], [[0, 1], [1, 1]]]

type HalfAdd<B extends number[], C extends number, R extends number[] = []> = 
  | R['length'] extends 32
  ? R
  : B extends [number, ...infer X extends number[]]
  ? HalfAdd<X, Carry[0][B[0]][C], [...R, Result[0][B[0]][C]]>
  : C extends 0 ? [] : [1]

export type Add<A extends number[], B extends number[], C extends number = 0, R extends number[] = []> =
  | R['length'] extends 32
  ? R
  : A extends [number, ...infer X extends number[]]
  ? B extends [number, ...infer Y extends number[]]
  ? Add<X, Y, Carry[A[0]][B[0]][C], [...R, Result[A[0]][B[0]][C]]>
  : HalfAdd<A, C>
  : HalfAdd<B, C>

export type Plus<X extends string | number, Y extends string | number> = ToDecimal<Add<ToBinary<X>, ToBinary<Y>>>
export type Minus<X extends string | number, Y extends string | number> = ToDecimal<Add<ToBinary<X>, Complement<ToBinary<Y>>>>

export type Sum<X extends number[][]> =
  | X extends [infer L extends number[], infer M extends number[], ...infer R extends number[][]]
  ? Sum<[Add<L, M>, ...R]>
  : X extends [infer L extends number[]]
  ? L
  : Zero
