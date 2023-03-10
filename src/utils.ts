export type numeric = number | bigint
export type primitive = string | numeric | boolean | null | undefined
export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ToString<T extends primitive> = `${T}`
export type ToNumber<T extends string> = T extends `${infer N extends number}` ? N : never
export type ToBigInt<T extends string> = T extends `${infer N extends bigint}` ? N : never

export type PadStart<T extends number, V extends number, R extends number[] = []> =
  | R['length'] extends T
  ? R
  : PadStart<T, V, [V, ...R]>

export type PadEnd<T extends number, V extends number, R extends number[] = []> =
  | R['length'] extends T
  ? R
  : PadEnd<T, V, [...R, V]>

export type TrimStart<T extends number[], V extends number> =
  | T extends [V, ...infer R extends number[]]
  ? TrimStart<R, V>
  : T

export type TrimEnd<T extends number[], V extends number> =
  | T extends [...infer L extends number[], V]
  ? TrimEnd<L, V>
  : T

export type Tail<T extends number[]> =
  | T extends [number, ...infer R extends number[]]
  ? R
  : []

export type OrMap = [[0, 1], [1, 1]]
export type AndMap = [[0, 0], [0, 1]]
export type XorMap = [[0, 1], [1, 0]]
export type NotMap = [1, 0]
