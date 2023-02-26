import { Decimal, digits } from './decimal'
import { Add, binary } from './integer'
import { numeric, PadStart, ToString } from './utils'

export type floating = [sign: number, exponent: number[], mantissa: number[]]

type ToExponent<X extends number[], O extends number[]> =
  | Add<O, PadStart<O['length'], 0, binary.Encode<digits.Decode<ToString<binary.Encode<X>['length']>>>>>

type ToMantissa<X extends number[], Y extends number[], T extends number> =
  | binary.EncodeFrac<Y, T, binary.Encode<X>> extends [number, ...infer Z extends number[]]
  ? Z
  : never

export namespace float {
  export type Offset = [0, 1, 1, 1, 1, 1, 1, 0]

  export type Encode<S extends numeric> =
    | Decimal.Decode<ToString<S>> extends [infer S extends number, infer I extends number[], infer F extends number[]]
    ? [S, ToExponent<I, Offset>, ToMantissa<I, F, 24>]
    : never

  export type encode<S extends numeric> =
    | Encode<S> extends [infer S extends number, infer I extends number[], infer F extends number[]]
    ? `${S}${digits.Encode<I>}${digits.Encode<F>}`
    : never
}
