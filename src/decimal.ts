export namespace digits {
  export type encode<A extends number[]> =
    | A extends [infer L extends number, ...infer R extends number[]]
    ? `${L}${encode<R>}`
    : ''

  export type decode<T extends string> =
    | T extends `${infer L extends number}${infer R}`
    ? [L, ...decode<R>]
    : []
}

type _Encode<T extends string> =
  | T extends `${infer L}.${infer R}`
  ? [digits.decode<L>, digits.decode<R>]
  : [digits.decode<T>, []]

type ToInteger<A extends number[]> =
  | A['length'] extends 0
  ? '0'
  : digits.encode<A>

type ToFractional<A extends number[]> =
  | A['length'] extends 0
  ? ''
  : `.${digits.encode<A>}`

export type Decimal = [sign: number, integer: number[], fractional: number[]]

export namespace Decimal {
  export type Encode<T extends string> =
    | T extends `-${infer R}`
    ? [1, ..._Encode<R>]
    : [0, ..._Encode<T>]

  export type Decode<X extends Decimal> =
    | `${['', '-'][X[0]]}${ToInteger<X[1]>}${ToFractional<X[2]>}`
}
