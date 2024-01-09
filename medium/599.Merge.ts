/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  For example

  ```ts
  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
  ```

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

type Merge<F, S, O = F & S> = {
  [K in keyof O]: K extends keyof S ? S[K] : O[K]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/


/**
 * Description:
 *   简单的 merge 两个对象就好了，但是需要注意的是，如果两个对象中存在相同的 key 的话，我们需要使用第二个对象中的 key 的值
 *   因此我们的做法是使用 '|' 将两个对象的 key 进行合并
 *   然后每次先判断 key 是否属于 object2，如果属于的话，我们就使用 object2 中的 key 的值，否则我们就使用 object1 中的 key 的值
 */