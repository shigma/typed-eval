export type primitive = string | number | boolean | null | undefined
export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ToString<T extends primitive> = `${T}`
export type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never

export type Join<A extends primitive[], S extends string = ''> =
  | A extends [infer L extends primitive, ...infer R extends primitive[]]
  ? Join<R, `${S}${L}`>
  : S

export type Split<S, M extends string = ''> =
  | S extends `${infer L}${M}${infer R}`
  ? [L, ...Split<R>]
  : []

export type FromDigits<A extends primitive[], S extends string = ''> =
  | A extends [infer L extends primitive, ...infer R extends primitive[]]
  ? FromDigits<R, `${L}${S}`>
  : S

export type ToDigits<S, M extends string = ''> =
  | S extends `${infer L extends number}${M}${infer R}`
  ? [...ToDigits<R>, L]
  : []
