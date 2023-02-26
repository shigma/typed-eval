import { numeric, OrMap, PadEnd, ToBigInt, ToNumber, ToString, XorMap } from './utils'
import { decimal, digits } from './decimal'

namespace Div2 {
  export type Result = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
  export type Carry = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
  export type Matrix = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]]
}

type Div2<A extends number[], B extends number[] = [], C extends number = 0> =
  | A extends [infer X extends number, ...infer Y extends number[]]
  ? Div2<Y, [...B, Div2.Matrix[C][Div2.Result[X]]], Div2.Carry[X]>
  : [B extends [0, ...infer R] ? R : B, C]

type __Encode<X extends number[], R extends number[] = []> =
  | X extends [...unknown[], infer Y extends number]
  ? __Encode<Div2<X>[0], [...R, Div2.Carry[Y]]>
  : R

namespace Mul2 {
  export type Result = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
  export type Carry = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
  export type Matrix = [[0, 2, 4, 6, 8], [1, 3, 5, 7, 9]]
}

type Mul2<A extends number[], C extends number = 0, R extends number[] = []> =
  | A extends [...infer X extends number[], infer Y extends number]
  ? Mul2<X, Mul2.Carry[Y], [Mul2.Matrix[C][Mul2.Result[Y]], ...R]>
  : C extends 0 ? R : [1, ...R]

type __Decode<X extends number[]> =
  | X extends [infer L extends number, ...infer R extends number[]]
  ? Mul2<__Decode<R>, L>
  : []

export type Complement<A extends Integer, S extends number = 0> =
  | A extends [infer L extends number, ...infer R extends number[]]
  ? [XorMap[S][L], ...Complement<R, OrMap[S][L]>]
  : []

export type Sign<X extends Integer> = X extends [...number[], infer R extends number] ? R : never
export type Flip<X extends Integer, S extends number> = S extends 0 ? X : Complement<X>

export type Integer = number[]

export namespace Integer {}

export namespace int32 {
  type _Encode<X extends decimal> =
    | X[0] extends 0
    ? PadEnd<32, 0, __Encode<X[1]>>
    : Complement<PadEnd<32, 0, __Encode<X[1]>>>

  type _Decode<X extends Integer> =
    | X[31] extends 0
    ? [0, __Decode<X>, []]
    : [1, __Decode<Complement<X>>, []]

  export type Encode<S extends numeric> = _Encode<decimal.Encode<ToString<S>>>
  export type Decode<A extends Integer> = ToNumber<decimal.Decode<_Decode<A>>>
  export type Zero = PadEnd<32, 0>

  export type encode<S extends numeric> = digits.encode<Encode<S>>
  export function encode<S extends numeric>(x: S): encode<S> {
    if (x >= 0) return x.toString(2).padStart(32, '0') as any
    let y = (-1 - x).toString(2)
    if (y === '0') y = ''
    return y.padStart(32, '1') as any
  }

  export type decode<S extends string> = Decode<digits.decode<S>>
  export function decode<S extends string>(s: S): decode<S> {
    const v = parseInt(s, 2)
    if (!s[31]) return v as any
    return v - (1 << 32) as any
  }
}

export namespace int64 {
  type _Encode<X extends decimal> =
    | X[0] extends 0
    ? PadEnd<64, 0, __Encode<X[1]>>
    : Complement<PadEnd<64, 0, __Encode<X[1]>>>

  type _Decode<X extends Integer> =
    | X[63] extends 0
    ? [0, __Decode<X>, []]
    : [1, __Decode<Complement<X>>, []]

  export type Encode<S extends numeric> = _Encode<decimal.Encode<ToString<S>>>
  export type Decode<A extends Integer> = ToBigInt<decimal.Decode<_Decode<A>>>
  export type Zero = PadEnd<64, 0>

  export type encode<S extends numeric> = digits.encode<Encode<S>>
  export function encode<S extends numeric>(x: S): encode<S> {
    if (x >= 0) return x.toString(2).padStart(32, '0') as any
    let y = (-1 - x).toString(2)
    if (y === '0') y = ''
    return y.padStart(32, '1') as any
  }

  export type decode<S extends string> = Decode<digits.decode<S>>
  export function decode<S extends string>(s: S): decode<S> {
    const v = (BigInt(parseInt(s.slice(0, 32), 2)) << 32n) + BigInt(parseInt(s.slice(32), 2))
    if (!s[63]) return v as any
    return v - (1n << 64n) as any
  }
}
