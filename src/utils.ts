export type numeric = number | bigint
export type primitive = string | numeric | boolean | null | undefined
export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ToString<T extends primitive> = `${T}`
export type ToNumber<T extends string> = T extends `${infer N extends number}` ? N : never
export type ToBigInt<T extends string> = T extends `${infer N extends bigint}` ? N : never

export type PadStart<T extends number, V = any, R extends V[] = []> =
  | R['length'] extends T
  ? R
  : PadStart<T, V, [V, ...R]>

export type OrMap = [[0, 1], [1, 1]]
export type AndMap = [[0, 0], [0, 1]]
export type XorMap = [[0, 1], [1, 0]]
export type NotMap = [1, 0]
