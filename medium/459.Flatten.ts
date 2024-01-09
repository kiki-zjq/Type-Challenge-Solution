/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array

  ### Question

  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

  For example:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

type Flatten<T extends unknown[], Res extends unknown[] = []> = 
  T extends [infer X, ...infer Y] ?
    X extends unknown[] ?
      Flatten<[...X, ...Y], Res> :
      Flatten<Y, [...Res, X]> :
    Res

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *  这一题需要我们彻底拍平一个数组，因为可能存在多层嵌套，所以我们需要使用递归的方式来解决
 *  在每一次递归中，我们会先取得数组的第一个元素，如果这个元素仍然是数组类型的话，我们会将这个元素展开，然后将展开后的结果和剩余的数组进行拼接
 *  然后继续处理整个数组
 *  相应的，如果这个元素不是数组类型的话，我们就把这个元素直接加入到结果数组中，然后继续处理剩余的数组
 */