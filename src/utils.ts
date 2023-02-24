export type primitive = string | number | boolean | null | undefined
export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ToString<T extends primitive> = `${T}`
export type ToNumber<T extends string> = T extends `${infer N extends number}` ? N : never

export type Join<A extends primitive[], S extends string = ''> =
  | A extends [infer L extends primitive, ...infer R extends primitive[]]
  ? Join<R, `${S}${L}`>
  : S

export type Split<S, M extends string = ''> =
  | S extends `${infer L}${M}${infer R}`
  ? [L, ...Split<R>]
  : []

export type FromDigits<A extends number[]> =
  | A extends [infer L extends number, ...infer R extends number[]]
  ? `${FromDigits<R>}${L}`
  : ''

export type FromSignedDigits<X extends [number, number[]]> =
  | X[0] extends 0
  ? FromDigits<X[1]>
  : `-${FromDigits<X[1]>}`

export type PadEnd<T extends number, V = any, R extends V[] = []> =
  | R['length'] extends T
  ? R
  : PadEnd<T, V, [...R, V]>

export type Seq32 = PadEnd<32, any>

export type ToDigits<T extends string> =
  | T extends `${infer L extends number}${infer R}`
  ? [...ToDigits<R>, L]
  : []

export type ToSignedDigits<T extends string> =
  | T extends `-${infer R}`
  ? [1, ToDigits<R>]
  : [0, ToDigits<T>]
