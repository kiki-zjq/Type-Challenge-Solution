/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */

type KebabCase<S> = 
  S extends `${infer X}${infer Y}` ?
    Y extends Uncapitalize<Y> ? 
      `${Uncapitalize<X>}${KebabCase<Y>}` : 
      `${Uncapitalize<X>}-${KebabCase<Y>}` : 
    S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *   1. Uncapitalize<T> - Converts the first character of a string to lower case.
 *   2. 实际上我们会遍历整个字符串的每一个字符，每次遍历的时候我们都会将 X 变成小写 
 *   3. 同时我们判断 Y 是否是一个小写字母开头的
 *      3.1. 如果是的话，那么我们就不需要在 X 和 Y 之间增加 '-'
 *      3.2. 如果不是的话，那么我们就需要在 X 和 Y 之间增加 '-'
 */