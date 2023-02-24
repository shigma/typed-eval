import { FromDigits, FromSignedDigits, PadEnd, ToDigits, ToNumber, ToSignedDigits, ToString } from './utils'

namespace Binary {
  type DivMap = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
  type ResMap = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
  type DivMatrix = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]

  type Div2<A extends number[], B extends number[] = [], C extends number = 0> =
    | A extends [...infer L extends number[], infer R extends number]
    ? Div2<L, [DivMatrix[C][DivMap[R]], ...B], ResMap[R]>
    : [B extends [...infer R, 0] ? R : B, C]

  export type Encode<X extends number[]> =
    | X extends [infer R extends number, ...unknown[]]
    ? [ResMap[R], ...Encode<Div2<X>[0]>]
    : []

  type MultMap = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
  type CarryMap = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
  type MultMatrix = [[0, 2, 4, 6, 8], [1, 3, 5, 7, 9]]

  type Mult2<A extends number[], B extends number[] = [], C extends number = 0> =
    | A extends [infer L extends number, ...infer R extends number[]]
    ? Mult2<R, [...B, MultMatrix[C][MultMap[L]]], CarryMap[L]>
    : C extends 0 ? B : [...B, 1]

  export type Decode<X extends number[]> =
    | X extends [infer L extends number, ...infer R extends number[]]
    ? Mult2<Decode<R>, [], L>
    : []
}

type Result = [[0, 1], [1, 0]]
type Carry = [[0, 1], [1, 1]]

export type Complement<A extends number[], S extends number = 0> =
  | A extends [infer L extends number, ...infer R extends number[]]
  ? [Result[S][L], ...Complement<R, Carry[S][L]>]
  : []

type Encode<X extends [number, number[]]> =
  | X[0] extends 0
  ? PadEnd<32, 0, Binary.Encode<X[1]>>
  : Complement<PadEnd<32, 0, Binary.Encode<X[1]>>>

type Decode<X extends number[]> =
  | X[31] extends 0
  ? [0, Binary.Decode<X>]
  : [1, Binary.Decode<Complement<X>>]

export type ToBinary<S extends string | number> = Encode<ToSignedDigits<ToString<S>>>
export type ToDecimal<A extends number[]> = ToNumber<FromSignedDigits<Decode<A>>>

export type ToBase2<S extends string> = FromDigits<Binary.Encode<ToDigits<S>>>
export type ToBase10<S extends string> = FromDigits<Binary.Decode<ToDigits<S>>>
