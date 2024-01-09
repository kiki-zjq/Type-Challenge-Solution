/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal

  ### Question

  Compute the length of a string literal, which behaves like `String#length`.

  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

type LengthOfString<S extends string, Arr extends unknown[] = []> = 
  S extends `${infer X}${infer Y}` ?
    LengthOfString<Y, [X, ...Arr]> :
    Arr['length']

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 * 这一题需要我们计算字符串的长度，但是在类型编程中，对于字符串我们没有 `.length` 属性可以直接使用
 * 但是考虑到对于元组类型，我们可以使用 `['length']` 来获取元组的长度，所以我们的思路就是如何将一个字符串
 * 转换成一个数组，然后再获取数组的长度
 */