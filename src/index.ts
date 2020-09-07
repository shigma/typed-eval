type primitive = string | number | boolean | bigint

type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type _DJoin<S extends primitive[]> = S extends [unknown, ...infer U] ? `${_DJoin<U>}${S[0]}` : ''

type _Digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

type _DigitsComp = [never, 9, 8, 7, 6, 5, 4, 3, 2, 1]

type _DComp<T> = T extends keyof _DigitsComp ? _DigitsComp[T] & number : never

type _DSeq<N extends number, S extends any[] = []> = S["length"] extends N ? S : _DSeq<N, [...S, 0]>

type __DSplit<S extends string> =
    string extends S ? number[] : S extends '' ? [] : S extends `${infer T}${infer U}` ? 
    [...__DSplit<U>, T extends keyof _Digits ? _Digits[T] & number : never] : never

type _DSplit<S extends primitive> = __DSplit<`${S}`>

type __DPlus<A extends digit, B extends digit> = [..._DSeq<A>, ..._DSeq<B>]["length"] & number

type _DCarryPlus<A extends primitive, B extends any[]> = A extends digit ? [A, ...B] : [_DSplit<A>[0], ..._DPlus<B, [1]>]

type _DPlus<A extends any[], B extends any[]> =
    A extends [unknown, ...infer S] ? B extends [unknown, ...infer U] ?
    _DCarryPlus<__DPlus<A[0], B[0]>, _DPlus<S, U>> : A : B

type __DMinus<A extends digit, B extends digit> =
    _DSeq<A> extends [..._DSeq<B>, ...infer C] ? C['length'] :
    _DSeq<B> extends [..._DSeq<A>, ...infer C] ? `-${C['length']}` : never

type _DTrim<A extends any[]> = A extends [...infer T, infer R] ? R extends 0 ? _DTrim<T> : A : A

type _DCarryMinus<A extends primitive, B extends any[]> = B extends [] ? _DSplit<A> : B extends [...infer T, '-']
    ? A extends digit ? [_DComp<A>, ..._DTrim<_DMinus<T, [1]>>, '-'] : [_DSplit<A>[0], ...B]
    : A extends digit ? [A, ...B] : [_DComp<_DSplit<A>[0]>, ..._DTrim<_DMinus<B, [1]>>]

type _DMinus<A extends any[], B extends any[]> =
    B extends [unknown, ...infer U] ? A extends [unknown, ...infer S] ?
    _DCarryMinus<__DMinus<A[0], B[0]>, _DMinus<S, U>> : [...B, '-'] : A

type __Plus<A extends string, B extends string> = _DJoin<_DPlus<__DSplit<A>, __DSplit<B>>>

type __Minus<A extends string, B extends string> = _DJoin<_DMinus<__DSplit<A>, __DSplit<B>>>

type _Plus<A extends string, B extends string> = A extends `-${infer S}`
    ? B extends `-${infer T}` ? `-${__Plus<S, T>}` : __Minus<B, S>
    : B extends `-${infer T}` ? __Minus<A, T> : __Plus<A, B>

type _Minus<A extends string, B extends string> = A extends `-${infer S}`
    ? B extends `-${infer T}` ? __Minus<T, S> : `-${__Plus<S, B>}`
    : B extends `-${infer T}` ? __Plus<A, T> : __Minus<A, B>

export type Plus<A extends primitive, B extends primitive> = _Plus<`${A}`, `${B}`>
export type Minus<A extends primitive, B extends primitive> = _Minus<`${A}`, `${B}`>
