type ToDigits<T extends string> =
  | T extends `${infer L extends number}${infer R}`
  ? [L, ...ToDigits<R>]
  : []

type _Encode<T extends string> =
  | T extends `${infer L}.${infer R}`
  ? [ToDigits<L>, ToDigits<R>]
  : [ToDigits<T>, []]

type FromDigits<A extends number[]> =
  | A extends [infer L extends number, ...infer R extends number[]]
  ? `${L}${FromDigits<R>}`
  : ''

type ToInteger<A extends number[]> =
  | A['length'] extends 0
  ? '0'
  : FromDigits<A>

type ToFractional<A extends number[]> =
  | A['length'] extends 0
  ? ''
  : `.${FromDigits<A>}`

export type Decimal = [sign: number, integer: number[], fractional: number[]]

export namespace Decimal {
  export type Encode<T extends string> =
    | T extends `-${infer R}`
    ? [1, ..._Encode<R>]
    : [0, ..._Encode<T>]

  export type Decode<X extends Decimal> =
    | `${['', '-'][X[0]]}${ToInteger<X[1]>}${ToFractional<X[2]>}`
}
