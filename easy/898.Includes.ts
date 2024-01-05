/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

/** solution 1 */
type Includes<T extends readonly any[], U> = {
  [P in T[number]]: true
}[U] extends true ? true : false

/** solution 2 */
type Includes<T extends readonly any[], U> = 
  T extends [infer X, ...infer Y] ?
    Equal<X, U> extends true ?
      true :
      Includes<Y, U> :
    false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/


/**
 * Description:
 * 这一题给出了两个解法
 * 
 * solution 1 虽然没有办法度过所有的测试用例，但却是一个很好的思路
 * 在 solution 1 中，我们结合了之前的 11. Tuple to Object 的思路，将数组中的每一个元素都映射到了一个对象中
 * 例如 tuple [a, b, c] => obj { a: true, b: true, c: true }
 * 然后我们只需要判断 obj[U] 是否为 true 即可
 * 然而这个方法受限制于 tuple 中的元素必须是 string | number | symbol
 * 
 * solution 2 就是一个常见的递归解法，我们会每次取出 tuple 中的第一个元素，然后判断它是否等于 U
 */