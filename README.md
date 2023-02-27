# typed-eval

Type-based high-precision computation does right.

## Features

- Data types: int32, int64, float (WIP), double (WIP)
- Operators:
  - Arithmetic: `+`, `-`, `*`, `%`, `//`, `/` (WIP), `**` (WIP)
  - Comparison: `>`, `<`, `>=`, `<=`, `==`, `!=`
  - Bitwise: `&`, `|`, `^`, `~` (WIP), `<<`, `>>`, `>>>`
  - Logical: `&&` (WIP), `||` (WIP), `!` (WIP)
  - Parentheses: `()`
- Expression with operator precedence

## Basic Usage

```ts
import { add, sub, mul, divmod, calc } from 'typed-eval'

type P1 = add<114514, 1919810>
//   ^? type P1 = 2034324

const P2 = add(114514, -1919810)
//    ^? const P2 = -1805296

type S1 = sub<-114514, 1919810>
//   ^? type S1 = -2034324

const S2 = sub(-114514, -1919810)
//    ^? const S2 = 1805296

type M1 = mul<114, 514>
//   ^? type M1 = 58596

const M2 = mul(2000, 5000)
//    ^? type M2 = 10000000

type D1 = divmod<10, 3>
//   ^? type D1 = [3, 1]

const D2 = divmod(-514, 114)
//    ^? const D2 = [-4, -58]

type C1 = calc<'114 + 514 + 1919 + 810'>
//   ^? type C1: 3357

const C2 = calc('100 - (2 - 3 * 4) * 5')
//    ^? const C2: 150
```

## Advanced Usage

Computations are performed under 32-bit (int32 and float) by default.
You can change the data type by importing the corresponding namespace.

```ts
import { int32, int64 } from 'typed-eval'

// compute under int32 (by default)
type M1 = int32.mul<11111111, 11111111>
//   ^? type M1 = -2047269199 (overflow)

// compute under int64
type M2 = int64.mul<11111111, 11111111>
//   ^? type M2 = 123456787654321
```

Note that due to the stack depth limitation of TypeScript, computations under 64-bit types may fail.

## License

Released under the [MIT](./LICENSE) license.
