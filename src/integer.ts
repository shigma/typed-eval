import { numeric, OrMap, PadStart, ToBigInt, ToNumber, ToString, XorMap } from './utils'
import { Decimal, digits } from './decimal'

export namespace binary {
  export namespace Div2 {
    export type Result = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
    export type Carry = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
    export type Matrix = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]
  }

  export type Div2<A extends number[], B extends number[] = [], C extends number = 0> =
    | A extends [infer X extends number, ...infer Y extends number[]]
    ? Div2<Y, [...B, Div2.Matrix[C][Div2.Result[X]]], Div2.Carry[X]>
    : [B extends [0, ...infer R] ? R : B, C]

  export type Encode<X extends number[], R extends number[] = []> =
    | X extends [...number[], infer Y extends number]
    ? Encode<Div2<X>[0], [Div2.Carry[Y], ...R]>
    : R

  export type EncodeFrac<X extends number[], T extends number, R extends number[] = []> =
    | R['length'] extends T
    ? R
    : Mul2<X> extends [infer S extends number, ...infer Y extends number[]]
    ? EncodeFrac<Y, T, [...R, S]>
    : never

  export namespace Mul2 {
    export type Result = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    export type Carry = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
    export type Matrix = [[0, 2, 4, 6, 8], [1, 3, 5, 7, 9]]
  }

  export type Mul2<A extends number[], C extends number = 0, R extends number[] = []> =
    | A extends [...infer X extends number[], infer Y extends number]
    ? Mul2<X, Mul2.Carry[Y], [Mul2.Matrix[C][Mul2.Result[Y]], ...R]>
    : [C, ...R]

  type TrimStart<X extends number[]> = X extends [0, ...infer Y] ? Y : X

  export type Decode<X extends number[]> =
    | X extends [...infer L extends number[], infer R extends number]
    ? TrimStart<Mul2<Decode<L>, R>>
    : []
}

export type Complement<A extends Integer, S extends number = 0> =
  | A extends [...infer L extends number[], infer R extends number]
  ? [...Complement<L, OrMap[S][R]>, XorMap[S][R]]
  : []

export type Flip<X extends Integer, S extends number> = S extends 0 ? X : Complement<X>

export type Integer = number[]

export namespace Integer {
  export type Encode<X extends Decimal, T extends number> = Flip<PadStart<T, 0, binary.Encode<X[1]>>, X[0]>
  export type Decode<X extends Integer> = [X[0], binary.Decode<Flip<X, X[0]>>, []]
}

export namespace int32 {
  export type Encode<S extends numeric> = Integer.Encode<Decimal.Decode<ToString<S>>, 32>
  export type Decode<A extends Integer> = ToNumber<Decimal.Encode<Integer.Decode<A>>>
  export type Zero = PadStart<32, 0>

  export type encode<S extends numeric> = digits.Encode<Encode<S>>
  export function encode<S extends numeric>(x: S): encode<S> {
    if (x >= 0) return x.toString(2).padStart(32, '0') as any
    let y = (-1 - x).toString(2)
    if (y === '0') y = ''
    return y.padStart(32, '1') as any
  }

  export type decode<S extends string> = Decode<digits.Decode<S>>
  export function decode<S extends string>(s: S): decode<S> {
    const v = parseInt(s, 2)
    if (!s[31]) return v as any
    return v - (1 << 32) as any
  }
}

export namespace int64 {
  export type Encode<S extends numeric> = Integer.Encode<Decimal.Decode<ToString<S>>, 64>
  export type Decode<A extends Integer> = ToBigInt<Decimal.Encode<Integer.Decode<A>>>
  export type Zero = PadStart<64, 0>

  export type encode<S extends numeric> = digits.Encode<Encode<S>>
  export function encode<S extends numeric>(x: S): encode<S> {
    if (x >= 0) return x.toString(2).padStart(32, '0') as any
    let y = (-1 - x).toString(2)
    if (y === '0') y = ''
    return y.padStart(32, '1') as any
  }

  export type decode<S extends string> = Decode<digits.Decode<S>>
  export function decode<S extends string>(s: S): decode<S> {
    const v = (BigInt(parseInt(s.slice(0, 32), 2)) << 32n) + BigInt(parseInt(s.slice(32), 2))
    if (!s[63]) return v as any
    return v - (1n << 64n) as any
  }
}
