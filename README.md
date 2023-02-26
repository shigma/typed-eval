# typed-eval

Type-based calculation does right.

```
npm i typed-eval
```

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
//   ^? type E1: 3357

const C2 = calc('100 - (2 - 3 * 4) * 5')
//    ^? const E2: 150
```
