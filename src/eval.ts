import { sub, add, lt, gt, lte, gte, eq, ne } from './add'
import { and, lshift, or, rshift, urshift, xor } from './bitwise'
import { div, mod, mul } from './multiply'
import { digit, ToNumber } from './utils'

type Precedence = [
  '**',
  '*' | '/' | '//' | '%',
  '+' | '-',
  '<<' | '>>' | '>>>',
  '<' | '<=' | '>' | '>=',
  '==' | '!=',
  '&',
  '^',
  '|',
  '&&',
  '||',
]

type Op3 = '>>>'
type Op2 = '**' | '//' | '<<' | '>>' | '==' | '!=' | '&&' | '||' | '<=' | '>='
type Op1 = '*' | '/' | '%' | '+' | '-' | '<' | '>' | '&' | '^' | '|' | '(' | ')'

type TrimLeft<S extends string> = S extends ` ${infer R}` ? TrimLeft<R> : S

type LexerNumber<S extends string, T extends string = ''> =
  | S extends `${infer L extends digit}${infer R}`
  ? LexerNumber<R, `${T}${L}`>
  : [ToNumber<T>, ...Lexer<TrimLeft<S>>]

type Lexer<S extends string> =
  | S extends `${digit}${string}`
  ? LexerNumber<S>
  : S extends `${Op3}${infer R}`
  ? S extends `${infer L}${R}` ? [L, ...Lexer<TrimLeft<R>>] : never
  : S extends `${Op2}${infer R}`
  ? S extends `${infer L}${R}` ? [L, ...Lexer<TrimLeft<R>>] : never
  : S extends `${Op1}${infer R}`
  ? S extends `${infer L}${R}` ? [L, ...Lexer<TrimLeft<R>>] : never
  : []

type Enclose<T extends any[], S extends any[]> =
  | S extends ['(', ...infer V]
  ? Parser<T, V>
  : S extends [infer U, ...infer V]
  ? [U, ...Enclose<T, V>]
  : never

type Precedent<K extends string, P extends string[] = Precedence> =
  | P extends [infer L extends string, ...infer R extends string[]]
  ? K extends L ? L : L | Precedent<K, R>
  : never

type Parser<T extends any[], S extends any[] = []> =
  | T extends ['(', ...infer R]
  ? Parser<R, ['(', ...S]>
  : T extends [')', ...infer R]
  ? Enclose<R, S>
  : T extends [infer L extends Op3 | Op2 | Op1, ...infer R]
  ? S extends [infer U extends Precedent<L>, ...infer V]
    ? [U, ...Parser<R, [L, ...V]>]
    : Parser<R, [L, ...S]>
  : T extends [infer L, ...infer R]
    ? [L, ...Parser<R, S>]
    : S

interface BinaryOperator<X extends number = number, Y extends number = number> {
  '+': add<X, Y>
  '-': sub<X, Y>
  '*': mul<X, Y>
  '/': div<X, Y>
  '//': div<X, Y>
  '%': mod<X, Y>
  '<': lt<X, Y>
  '>': gt<X, Y>
  '<=': lte<X, Y>
  '>=': gte<X, Y>
  '==': eq<X, Y>
  '!=': ne<X, Y>
  '&': and<X, Y>
  '|': or<X, Y>
  '^': xor<X, Y>
  '<<': lshift<X, Y>
  '>>': rshift<X, Y>
  '>>>': urshift<X, Y>
}

type Calc<T extends any[], S extends any[] = []> =
  | T extends [infer K extends keyof BinaryOperator, ...infer R]
  ? S extends [infer U extends number, infer V extends number, ...infer W]
    ? Calc<R, [BinaryOperator<V, U>[K], ...W]>
    : never
  : T extends [infer L extends number, ...infer R]
    ? Calc<R, [L, ...S]>
    : S[0]

export type evaluate<S extends string> = Calc<Parser<Lexer<TrimLeft<S>>>>

export function evaluate<S extends string>(expr: S): evaluate<S> {
  return eval(expr)
}
