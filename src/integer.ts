import { OrMap, PadEnd, ToNumber, ToString, XorMap } from './utils'
import { Decimal } from './decimal'

type DivMap = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
type ResMap = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
type DivMatrix = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]

type Div2<A extends number[], B extends number[] = [], C extends number = 0> =
  | A extends [...infer L extends number[], infer R extends number]
  ? Div2<L, [DivMatrix[C][DivMap[R]], ...B], ResMap[R]>
  : [B extends [...infer R, 0] ? R : B, C]

type __Encode<X extends number[]> =
  | X extends [infer R extends number, ...unknown[]]
  ? [ResMap[R], ...__Encode<Div2<X>[0]>]
  : []

type MultMap = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
type CarryMap = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
type MultMatrix = [[0, 2, 4, 6, 8], [1, 3, 5, 7, 9]]

type Mult2<A extends number[], B extends number[] = [], C extends number = 0> =
  | A extends [infer L extends number, ...infer R extends number[]]
  ? Mult2<R, [...B, MultMatrix[C][MultMap[L]]], CarryMap[L]>
  : C extends 0 ? B : [...B, 1]

type __Decode<X extends number[]> =
  | X extends [infer L extends number, ...infer R extends number[]]
  ? Mult2<__Decode<R>, [], L>
  : []

export type Integer = number[]

export namespace Integer {
  type _Encode<X extends Decimal> =
    | X[0] extends 0
    ? PadEnd<32, 0, __Encode<X[1]>>
    : Complement<PadEnd<32, 0, __Encode<X[1]>>>
  
  type _Decode<X extends Integer> =
    | X[31] extends 0
    ? [0, __Decode<X>]
    : [1, __Decode<Complement<X>>]

  export type Encode<S extends number> = _Encode<Decimal.Encode<ToString<S>>>
  export type Decode<A extends Integer> = ToNumber<Decimal.Decode<_Decode<A>>>
  export type Zero = PadEnd<32, 0>

  export type Complement<A extends Integer, S extends number = 0> =
    | A extends [infer L extends number, ...infer R extends number[]]
    ? [XorMap[S][L], ...Complement<R, OrMap[S][L]>]
    : []
}
