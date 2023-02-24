# typed-eval

Type-based calculation does right with TypeScript

```
npm i typed-eval
```

```ts
import { plus, minus, times, evaluate } from 'typed-eval'

type P1 = plus<114514, 1919810>
//   ^? type P1 = 2034324

const P2 = plus(114514, -1919810)
//    ^? const P2 = -1805296

type M1 = minus<-114514, 1919810>
//   ^? type M1 = -2034324

const M2 = minus(-114514, -1919810)
//    ^? const M2 = 1805296

type T1 = times<114, 514>
//   ^? type T1 = 58596

const T2 = times(2000, 5000)
//    ^? type T2 = 10000000

type E1 = evaluate<'114 + 514 + 1919 + 810'>
//   ^? type E1: 3357

const E2 = evaluate('100 - (2 - 3 * 4) * 5')
//    ^? const E2: 150
```
