/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<T> = {
  [key in keyof T as 
    string extends key ? 
      never : number extends key ? 
        never : symbol extends key ? 
          never : key
  ]: T[key]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *  这一题要求我们移除 object 中的 index signature 
 *  我们的做法仍然是遍历 object 中所有的 key，然后判断 string 是否继承自 key
 *  做法的正确性在于，如果说我们的 object 形如 object = {'name': 'foo'}
 *  那么应该有 key extends string 成立，而不是 string extends key 成立
 *  因此当 string extends key 成立的时候，我们可以判断这是一个 index signature
 */