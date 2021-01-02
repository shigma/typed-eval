# typed-eval

Type-based calculation does right with TypeScript

```
npm i typed-eval
```

```ts
import { Plus, Minus, Eval } from 'typed-eval'

type test1 = Plus<9999999, 11111> // 10011110
type test2 = Minus<1000000, 99999> // 900001
type test3 = Plus<9999999, -11111> // 9988888
type test4 = Minus<-1000000, -99999> // -900001

// support negatives and whitespaces
type test5 = Eval<'11 + -233 - 99'> // -321
```
