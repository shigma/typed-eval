import { Join, ToDigits } from './utils'

type DivMap = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
type ResMap = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
type DivMatrix = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]

type Div2<A extends number[], B extends number[] = [], C extends number = 0> =
  | A extends [infer L extends number, ...infer R extends number[]]
  ? Div2<R, [...B, DivMatrix[C][DivMap[L]]], ResMap[L]>
  : [B extends [0, ...infer R] ? R : B, C]

type ToBase2<X extends number[]> =
  | X extends [...unknown[], infer R extends number]
  ? [...ToBase2<Div2<X>[0]>, ResMap[R]]
  : []

type MultMap = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
type CarryMap = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
type MultMatrix = [[0, 2, 4, 6, 8], [1, 3, 5, 7, 9]]

type Mult2<A extends number[], B extends number[] = [], C extends number = 0> =
  | A extends [...infer L extends number[], infer R extends number]
  ? Mult2<L, [MultMatrix[C][MultMap[R]], ...B], CarryMap[R]>
  : C extends 0 ? B : [1, ...B]

type ToBase10<X extends number[]> =
  | X extends [...infer L extends number[], infer R extends number]
  ? Mult2<ToBase10<L>, [], R>
  : []

export type ToBase2String<S extends string> = Join<ToBase2<ToDigits<S>>>
export type ToBase10String<S extends string> = Join<ToBase10<ToDigits<S>>>




type X = ToBase2String<'114514'>


type Y = ToBase10String<'11011111101010010'>
