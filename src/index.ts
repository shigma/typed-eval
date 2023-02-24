import { ToBase2, ToBase10 } from './binary'
import { evaluate } from './eval'
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

const v1 = evaluate('114514 + 1919810')
//    ^?

