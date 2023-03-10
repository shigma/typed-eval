import { Decimal, digits, struct } from './decimal'
import { Add, binary } from './integer'
import { numeric, PadStart, ToNumber, ToString } from './utils'

export type Floating = [sign: number[], exponent: number[], mantissa: number[]]

type ToExponent<X extends number[], O extends number[]> =
  | Add<O, PadStart<O['length'], 0, binary.Encode<digits.Decode<ToString<binary.Encode<X>['length']>>>>>

type ToMantissa<X extends number[], Y extends number[], T extends number> =
  | binary.EncodeFrac<Y, T, binary.Encode<X>> extends [number, ...infer Z extends number[]]
  ? Z
  : never

export namespace Floating {
  export type Encode<D extends Decimal, O extends number[]> = [[D[0]], ToExponent<D[1], O>, ToMantissa<D[1], D[2], 24>]
  export type Decode<F extends Floating> = [F[0][0], F[1], F[2]]
}

export namespace float {
  export type Offset = [0, 1, 1, 1, 1, 1, 1, 0]

  export type Encode<S extends numeric> = Floating.Encode<Decimal.Decode<ToString<S>>, Offset>
  export type Decode<A extends Floating> = ToNumber<Decimal.Encode<Floating.Decode<A>>>

  export type encode<S extends numeric> = struct.Encode<Encode<S>>
  export type decode<S extends string> = Decode<struct.Decode<S, [1, 8, 23]>>
}
