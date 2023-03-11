import { Concat, Decimal, Digits, Slice } from './decimal'
import { Binary, Integer } from './integer'
import { numeric, PadStart, Rest, ToNumber, ToString, TrimEnd } from './utils'

export namespace Fractional {
  export type Encode<X extends number[], T extends number, R extends number[] = []> =
    | R['length'] extends T
    ? Binary.Round<TrimEnd<X, 0>, R>
    : Binary.Mul2<X> extends [infer Y extends number[], infer S extends number]
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
    Integer.Add<O, PadStart<O['length'], 0, Binary.Encode<Digits.Decode<ToString<Binary.Encode<D[1]>['length']>>>>>,
    Rest<Fractional.Encode<D[2], T, Binary.Encode<D[1]>>>,
  ]

  type DecimalRound<S extends [number[], number[]]> =
    | S[1] extends []
    ? S[0]
    : S[1] extends [5]
    ? S[0] // FIXME
    : S[0] // FIXME

  export type Decode<F extends Floating, T extends number, O extends number[]> =
    | Slice<F[2], [ToNumber<Digits.Encode<Binary.Decode<Integer.Sub<F[1], O>>>>]> extends [infer L extends number[], infer R extends number[]]
    ? Binary.Decode<[1, ...L]> extends infer U extends number[]
    ? [F[0][0], U, DecimalRound<Slice<Fractional.Decode<R>, [T], [U]>> extends [...U, ...infer V extends number[]] ? V : never]
    : never
    : never
}

export namespace float {
  export type Encode<S extends numeric> = Floating.Encode<Decimal.Decode<ToString<S>>, 24, [0, 1, 1, 1, 1, 1, 1, 0]>
  export type Decode<A extends Floating> = ToNumber<Decimal.Encode<Floating.Decode<A, 8, [0, 1, 1, 1, 1, 1, 1, 1]>>>

  // @ts-expect-error
  export type encode<S extends numeric> = Digits.Encode<Concat<Encode<S>>>
  export type decode<S extends string> = Decode<Slice<Digits.Decode<S>, [1, 8]>>
}
