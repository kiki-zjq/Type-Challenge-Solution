/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #math #template-literal

  ### Question

  Implement the `Absolute` type. A type that take string, number or bigint. The output should be a positive number string

  For example

  ```ts
  type Test = -100
  type Result = Absolute<Test> // expected to be "100"
  ```

  > View on GitHub: https://tsch.js.org/529
*/

/* _____________ Your Code Here _____________ */

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/529/answer
  > View solutions: https://tsch.js.org/529/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *   这一题需要我们实现一个类型，这个类型接受一个数字、字符串或者大整数，然后返回一个字符串，这个字符串是输入的绝对值
 *   但是这一题的难点在于，我们需要考虑到输入的数字可能是负数，所以我们需要先判断输入的数字是否是负数，如果是负数的话，我们需要把负号去掉 *   这里我们使用了 `${T}` 的方式来将输入的数字转换成字符串，然后再使用模板字符串的方式来判断是否是负数
 *   如果是负数的话，我们就使用 `infer` 来获取到负号后面的部分，然后将这个部分返回
 *   如果不是负数的话，我们就直接返回这个数字的字符串形式
 */