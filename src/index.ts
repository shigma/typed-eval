type primitive = string | number | boolean | bigint

namespace N {
    type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

    type Join<S extends primitive[]> = S extends [unknown, ...infer U] ? `${Join<U>}${S[0]}` : ''

    type DigitMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    type Digit<T> = T extends keyof DigitMap ? DigitMap[T] & number : never

    type ComplementMap = [never, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    type Complement<T> = T extends keyof ComplementMap ? ComplementMap[T] & number : never

    type Sequence<N extends number, S extends any[] = []> = S["length"] extends N ? S : Sequence<N, [...S, 0]>

    type DigitPlus<A extends digit, B extends digit> = [...Sequence<A>, ...Sequence<B>]["length"] & number

    type DigitMinus<A extends digit, B extends digit> =
        Sequence<A> extends [...Sequence<B>, ...infer C] ? C['length'] :
        Sequence<B> extends [...Sequence<A>, ...infer C] ? `-${C['length']}` : never

    type StringSplit<S extends string> =
        string extends S ? number[] : S extends '' ? [] : S extends `${infer T}${infer U}` ? 
        [...StringSplit<U>, Digit<T>] : never

    type Split<S extends primitive> = StringSplit<`${S}`>

    type TrimZero<A extends any[]> = A extends [...infer T, infer R] ? R extends 0 ? TrimZero<T> : A : A

    type CarryPlus<A extends primitive, B extends any[]> = A extends digit ? [A, ...B] : [Split<A>[0], ...ListPlus<B, [1]>]

    type ListPlus<A extends any[], B extends any[]> =
        B extends [unknown, ...infer U] ? A extends [unknown, ...infer S] ?
        CarryPlus<DigitPlus<A[0], B[0]>, ListPlus<S, U>> : B : A

    type CarryMinus<A extends primitive, B extends any[]> =
        B extends [] ? Split<A> :
        B extends [...infer T, '-']
            ? A extends digit ? [Complement<A>, ...TrimZero<ListMinus<T, [1]>>, '-'] : [Split<A>[0], ...B]
            : A extends digit ? [A, ...B] : [Complement<Split<A>[0]>, ...TrimZero<ListMinus<B, [1]>>]

    type ListMinus<A extends any[], B extends any[]> =
        B extends [unknown, ...infer U] ? A extends [unknown, ...infer S] ?
        CarryMinus<DigitMinus<A[0], B[0]>, ListMinus<S, U>> : [...B, '-'] : A

    type UnsignedPlus<A extends string, B extends string> = Join<ListPlus<StringSplit<A>, StringSplit<B>>>

    type UnsignedMinus<A extends string, B extends string> = Join<ListMinus<StringSplit<A>, StringSplit<B>>>

    export type Plus<A extends string, B extends string> = A extends `-${infer S}`
        ? B extends `-${infer T}` ? `-${UnsignedPlus<S, T>}` : UnsignedMinus<B, S>
        : B extends `-${infer T}` ? UnsignedMinus<A, T> : UnsignedPlus<A, B>

    export type Minus<A extends string, B extends string> = A extends `-${infer S}`
        ? B extends `-${infer T}` ? UnsignedMinus<T, S> : `-${UnsignedPlus<S, B>}`
        : B extends `-${infer T}` ? UnsignedPlus<A, T> : UnsignedMinus<A, B>
}

export type Plus<A extends primitive, B extends primitive> = N.Plus<`${A}`, `${B}`>

export type Minus<A extends primitive, B extends primitive> = N.Minus<`${A}`, `${B}`>

namespace E {
    type digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0"

    type TrimSpace<A> = A extends ` ${infer R}` ? R : A

    type ParseOne<S, T extends string> = S extends `${T}${infer R}`
        ? S extends `${infer C}${infer R}` ? [C, R] : never
        : never

    type ParseMany<S, T extends string, P extends string = ""> = S extends `${T}${infer R}`
        ? S extends `${infer C}${R}` ? ParseMany<R, T, `${P}${C}`> : never
        : [P, S]

    type ParseNumber<S> = S extends `-${infer T}`
        ? ParseMany<T, digit, ""> extends [infer U, infer R] ? [`-${U & string}`, R] : never
        : ParseMany<S, digit, "">

    type Operator = '+' | '-'

    type ParseOperator<S> = ParseOne<S, Operator>

    export type Node<L = any, O = any, R = any> = { L: L, O: O, R: R }

    export type Parse<S> =
        ParseNumber<TrimSpace<S>> extends [infer A, infer U] ?
        ParseOperator<TrimSpace<U>> extends never ? [A, U] : ParseOperator<U> extends [infer O, infer V] ?
        Parse<TrimSpace<V>> extends [infer R, infer W] ? [Node<A, O, R>, TrimSpace<W>] : never : never : never

    export type Eval<T> = T extends Node<infer L, infer O, infer R> ? (
        O extends '+' ? N.Plus<Eval<L>, Eval<R>> :
        O extends '-' ? N.Minus<Eval<L>, Eval<R>> :
        never
    ) : T & string
}

export type Eval<S extends string> = E.Parse<S> extends [infer T, string] ? E.Eval<T> : never
