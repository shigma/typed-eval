export namespace digits {
  export type Encode<A extends number[], S extends string = ''> =
    | A extends [infer L extends number, ...infer R extends number[]]
    ? Encode<R, `${S}${L}`>
    : S

  export type Decode<T extends string, U extends number[] = []> =
    | T extends `${infer L extends number}${infer R}`
    ? Decode<R, [...U, L]>
    : U
}

export namespace struct {
  export type Encode<A extends number[][], S extends string = ''> =
    | A extends [infer L extends number[], ...infer R extends number[][]]
    ? Encode<R, digits.Encode<L, S>>
    : S

  export type Decode<T extends string, S extends number[], U extends number[][] = [[]]> =
    | U extends [...infer A extends number[][], infer B extends number[]]
    ? S extends [infer X extends number, ...infer Y extends number[]]
      ? B['length'] extends X
        ? Decode<T, Y, [...U, []]>
        : T extends `${infer L extends number}${infer R}`
        ? Decode<R, S, [...A, [...B, L]]>
        : never
      : A
    : never
}

type FromInteger<A extends string> =
  | A extends '0'
  ? []
  : digits.Decode<A>

type _Encode<T extends string> =
  | T extends `${infer L}.${infer R}`
  ? [FromInteger<L>, digits.Decode<R>]
  : [FromInteger<T>, []]

type ToInteger<A extends number[]> =
  | A['length'] extends 0
  ? '0'
  : digits.Encode<A>

type ToFractional<A extends number[]> =
  | A['length'] extends 0
  ? ''
  : `.${digits.Encode<A>}`

export type Decimal = [sign: number, integer: number[], fractional: number[]]

export namespace Decimal {
  export type Decode<T extends string> =
    | T extends `-${infer R}`
    ? [1, ..._Encode<R>]
    : [0, ..._Encode<T>]

  export type Encode<X extends Decimal> =
    | `${['', '-'][X[0]]}${ToInteger<X[1]>}${ToFractional<X[2]>}`
}
