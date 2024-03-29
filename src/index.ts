import { sub, add } from './add'
import { calc } from './eval'
import { divmod, mul } from './multiply'

export * from './add'
export * from './bitwise'
export * from './decimal'
export * from './eval'
export * from './floating'
export * from './integer'
export * from './multiply'
export * from './add'
export * from './utils'

type P1 = add<114514, 1919810>
//   ^?

const P2 = add(114514, -1919810)
//    ^?

type S1 = sub<-114514, 1919810>
//   ^?

const S2 = sub(-114514, -1919810)
//    ^?

type M1 = mul<114, 514>
//   ^?

const M2 = mul(2000, 5000)
//    ^?

type D1 = divmod<10, 3>
//    ^?

const D2 = divmod(-514, 114)
//    ^?

type C1 = calc<'114 + 514 + 1919 + 810'>
//   ^?

const C2 = calc('100 - (2 - 3 * 4) * 5')
//    ^?
