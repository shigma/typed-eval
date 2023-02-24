export type primitive = string | number | boolean | null | undefined
export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Join<A extends primitive[], S extends string = ''> =
  | A extends [infer L extends primitive, ...infer R extends primitive[]]
  ? Join<R, `${S}${L}`>
  : S

export type Split<S, M extends string = ''> = S extends `${infer L}${M}${infer R}` ? [L, ...Split<R>] : []
export type ToDigits<S, M extends string = ''> = S extends `${infer L extends number}${M}${infer R}` ? [L, ...ToDigits<R>] : []
