# typed-eval

Type-based calculation does right with TypeScript

```
npm i typed-eval
```

```ts
import { Plus, Minus, Multiply, evaluate } from 'typed-eval'

type P1 = Plus<114514, 1919810>
//   ^? type P1 = 2034324

type P2 = Plus<-114514, 1919810>
//   ^? type P2 = 1805296

type P3 = Plus<114514, -1919810>
//   ^? type P3 = -1805296

type P4 = Plus<-114514, -1919810>
//   ^? type P4 = -2034324

type M1 = Minus<114514, 1919810>
//   ^? type M1 = -1805296

type M2 = Minus<-114514, 1919810>
//   ^? type M2 = -2034324

type M3 = Minus<114514, -1919810>
//   ^? type M3 = 2034324

type M4 = Minus<-114514, -1919810>
//   ^? type M4 = 1805296

type T1 = Multiply<114, 514>
//   ^? type T1 = 58596

type T2 = Multiply<2000, 5000>
//   ^? type T2 = 10000000

const v1 = evaluate('114 + 514 + 1919 + 810')
//    ^? const v1: 3357

const v2 = evaluate('100 - (2 - 3 * 4) * 5')
//    ^? const v2: 150
```
