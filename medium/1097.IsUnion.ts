/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium #union

  ### Question

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

type IsUnion<A, B = A> =
    [A] extends [never] ?
    false :
      A extends A
          ? [B] extends [A]
              ? false
              : true
          : never


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *   首先我们判断 A 是否是一个 never 类型，如果是的话，直接返回 false
 *   接下来，我们的第一个 A extends A，利用了联合类型的 distributive 特性，使得 A 中的每一个 item 依次进行判断
 *   [B] extends [A]，这样我们不直接写 B 可以避免触发 distributive 特性，于是 B 就是整个完整的 A
 *   如果说 A 是联合类型，那么 B 是联合类型整体，A 是一个局部，这个判断就会失败，于是返回 true
 *   如果说 A 不是联合类型，那么 A 和 B 完全相同，判断成功，就会返回 false
 */