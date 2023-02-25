type ToDigits<T extends string> =
  | T extends `${infer L extends number}${infer R}`
  ? [...ToDigits<R>, L]
  : []

type EnsureDigits<S extends string> = S extends '' ? '0' : S

type _FromDigits<A extends number[]> =
  | A extends [infer L extends number, ...infer R extends number[]]
  ? `${_FromDigits<R>}${L}`
  : ''

type FromDigits<A extends number[]> = EnsureDigits<_FromDigits<A>>

export type Decimal = [number, number[]]

export namespace Decimal {
  export type Encode<T extends string> =
    | T extends `-${infer R}`
    ? [1, ToDigits<R>]
    : [0, ToDigits<T>]

  export type Decode<X extends Decimal> =
    | X[0] extends 0
    ? FromDigits<X[1]>
    : `-${FromDigits<X[1]>}`
}
