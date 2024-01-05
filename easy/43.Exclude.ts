/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #easy #built-in #union

  ### Question

  Implement the built-in `Exclude<T, U>`

  > Exclude from `T` those types that are assignable to `U`

  For example:

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > View on GitHub: https://tsch.js.org/43
*/

/* _____________ Your Code Here _____________ */

type MyExclude<T, U> = 
  T extends U ? never : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 * 这一题关键在于理解联合类型的分配特性 (distributive conditional types)
 * 官网上的介绍是 When conditional types act on a generic type, they become distributive when given a union type.
 * 也就是说，当联合类型与 extends 一起使用时，没有被视为一个整体，而是被视为了一个又一个独立的个体被判断，然后再将结果联合到一起的。
 * 例如 MyExclude<'a' | 'b' | 'c', 'a'>，当我们执行 T extends U 的时候，实际上发生的是
 * 1. 执行 'a' extends 'a'，返回 never
 * 2. 执行 'b' extends 'a'，返回 'b'
 * 3. 执行 'c' extends 'a'，返回 'c'
 * 4. 将 never | 'b' | 'c' 联合起来，返回 'b' | 'c'
 */