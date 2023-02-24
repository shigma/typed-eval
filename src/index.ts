import { ToBase2, ToBase10 } from './binary'
import { evaluate } from './eval'
import { Multiply } from './multiply'
import { Minus, Plus } from './plus'

type B1 = ToBase2<'114514'>
//   ^?

type B2 = ToBase10<'11011111101010010'>
//   ^?

type P1 = Plus<114514, 1919810>
//   ^?

type P2 = Plus<-114514, 1919810>
//   ^?

type P3 = Plus<114514, -1919810>
//   ^?

type P4 = Plus<-114514, -1919810>
//   ^?

type M1 = Minus<114514, 1919810>
//   ^?

type M2 = Minus<-114514, 1919810>
//   ^?

type M3 = Minus<114514, -1919810>
//   ^?

type M4 = Minus<-114514, -1919810>
//   ^?

type T1 = Multiply<114, 514>
//   ^?

type T2 = Multiply<2000, 5000>
//   ^?

const v1 = evaluate('114 + 514 + 1919 + 810')
//    ^?

const v2 = evaluate('100 - (2 - 3)')
//    ^?
