/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #union #utils

  ### Question

  Implement a type IsNever, which takes input type `T`.
  If the type of resolves to `never`, return `true`, otherwise `false`.

  For example:

  ```ts
  type A = IsNever<never> // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/1042
*/

/* _____________ Your Code Here _____________ */

type IsNever<T> = [T] extends [never] ? true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1042/answer
  > View solutions: https://tsch.js.org/1042/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *  这里要判断 never 类型，为什么我们不直接 type IsNever<T> = T extends never ? true : false 呢？
 *  是因为当我们输入的是一个 never 的时候，TS 会解析成一个空的联合类型
 *  也就是说 TS 既会试图使用联合类型的 distributive 特性，又由于 never 是一个空的联合类型，所以什么都不会执行，所以会直接返回 never
 *  而这里通过将其转换成元组的方式，去除了联合类型的 distributive 特性，所以我们可以正确的判断出 never 类型
 */