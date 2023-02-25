import { evaluate } from './eval'
import { mul } from './multiply'
import { sub, add } from './plus'

export * from './binary'
export * from './bitwise'
export * from './eval'
export * from './multiply'
export * from './plus'

type P1 = add<114514, 1919810>
//   ^?

const P2 = add(114514, -1919810)
//    ^?

type M1 = sub<-114514, 1919810>
//   ^?

const M2 = sub(-114514, -1919810)
//    ^?

type T1 = mul<114, 514>
//   ^?

const T2 = mul(2000, 5000)
//    ^?

type E1 = evaluate<'114 + 514 + 1919 + 810'>
//   ^?

const E2 = evaluate('100 - (2 - 3 * 4) * (3 ^ 6)')
//    ^?
