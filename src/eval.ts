import { Multiply } from './multiply'
import { Minus, Plus } from './plus'
import { digit, ToNumber } from './utils'

type TrimLeft<S extends string> = S extends ` ${infer R}` ? TrimLeft<R> : S

type LexerNumber<S extends string, T extends string = ''> =
  | S extends `${infer L extends digit}${infer R}`
  ? LexerNumber<R, `${T}${L}`>
  : [ToNumber<T>, ...Lexer<TrimLeft<S>>]

type Lexer<S extends string> =
  | S extends `${infer L extends number}${infer R}`
  ? LexerNumber<S>
  : S extends `${infer L extends '+' | '-' | '*' | '(' | ')'}${infer R}`
  ? [L, ...Lexer<TrimLeft<R>>]
  : []

type Pop<T extends any[], S extends any[]> =
  | S extends ['(', ...infer V]
  ? Parser<T, V>
  : S extends [infer U, ...infer V]
  ? [U, ...Pop<T, V>]
  : never

type Parser<T extends any[], S extends any[] = []> =
  | T extends ['(', ...infer R]
  ? Parser<R, ['(', ...S]>
  : T extends [')', ...infer R]
  ? Pop<R, S>
  : T extends [infer L extends '*', ...infer R]
  ? S extends [infer U extends '*', ...infer V]
    ? [U, ...Parser<R, [L, ...V]>]
    : Parser<R, [L, ...S]>
  : T extends [infer L extends '+' | '-', ...infer R]
  ? S extends [infer U extends '+' | '-' | '*', ...infer V]
    ? [U, ...Parser<R, [L, ...V]>]
    : Parser<R, [L, ...S]>
  : T extends [infer L, ...infer R]
    ? [L, ...Parser<R, S>]
    : S

type Calc<T extends any[], S extends any[] = []> =
  | T extends ['+', ...infer R]
  ? S extends [infer U extends number, infer V extends number, ...infer W]
    ? Calc<R, [Plus<V, U>, ...W]>
    : never
  : T extends ['-', ...infer R]
  ? S extends [infer U extends number, infer V extends number, ...infer W]
    ? Calc<R, [Minus<V, U>, ...W]>
    : never
  : T extends ['*', ...infer R]
  ? S extends [infer U extends number, infer V extends number, ...infer W]
    ? Calc<R, [Multiply<V, U>, ...W]>
    : never
  : T extends [infer L extends number, ...infer R]
    ? Calc<R, [L, ...S]>
    : S[0]

export type evaluate<S extends string> = Calc<Parser<Lexer<S>>>

export function evaluate<S extends string>(expr: S): evaluate<S> {
  return eval(expr)
}