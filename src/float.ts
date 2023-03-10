import { Concat, Decimal, Digits, Scientific, Slice } from './decimal'
import { Add, Binary, Sub } from './integer'
import { numeric, PadStart, Tail, ToNumber, ToString } from './utils'

export namespace Fractional {
  export type Encode<X extends number[], T extends number, R extends number[] = []> =
    | R['length'] extends T
    ? R
    : Binary.Mul2<X> extends [infer S extends number, ...infer Y extends number[]]
    ? Encode<Y, T, [...R, S]>
    : never

  export type Decode<X extends number[], V extends number[] = []> =
    | X extends [...infer L extends number[], infer R extends number]
    ? Decode<L, Binary.Div2<[R, ...V, 0]>[0]>
    : V
}

export type Floating = [sign: number[], exponent: number[], mantissa: number[]]

export namespace Floating {
  export type Encode<D extends Decimal, T extends number, O extends number[]> = [
    [D[0]],
    Add<O, PadStart<O['length'], 0, Binary.Encode<Digits.Decode<ToString<Binary.Encode<D[1]>['length']>>>>>,
    Tail<Fractional.Encode<D[2], T, Binary.Encode<D[1]>>>,
  ]

  export type Decode<F extends Floating, O extends number[]> =
    | Slice<F[2], [ToNumber<Digits.Encode<Binary.Decode<Sub<F[1], O>>>>]> extends [infer L extends number[], infer R extends number[]]
    ? [F[0][0], Binary.Decode<[1, ...L]>, Slice<Fractional.Decode<R>, [16]>[0]]
    : never
}

export namespace float {
  export type Encode<S extends numeric> = Floating.Encode<Decimal.Decode<ToString<S>>, 24, [0, 1, 1, 1, 1, 1, 1, 0]>
  export type Decode<A extends Floating> = ToNumber<Decimal.Encode<Floating.Decode<A, [0, 1, 1, 1, 1, 1, 1, 1]>>>

  export type encode<S extends numeric> = Digits.Encode<Concat<Encode<S>>>
  export type decode<S extends string> = Decode<Slice<Digits.Decode<S>, [1, 8]>>
}
