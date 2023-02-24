import { evaluate } from './eval'
import { times } from './multiply'
import { minus, plus } from './plus'

export { evaluate, plus as Plus, minus as Minus, times as Multiply }

type P1 = plus<114514, 1919810>
//   ^?

const P2 = plus(114514, -1919810)
//    ^?

type M1 = minus<-114514, 1919810>
//   ^?

const M2 = minus(-114514, -1919810)
//    ^?

type T1 = times<114, 514>
//   ^?

const T2 = times(2000, 5000)
//    ^?

type E1 = evaluate<'114 + 514 + 1919 + 810'>
//   ^?

const E2 = evaluate('100 - (2 - 3 * 4) * 5')
//    ^?
