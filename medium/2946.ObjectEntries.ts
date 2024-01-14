/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > View on GitHub: https://tsch.js.org/2946
*/

/* _____________ Your Code Here _____________ */

type ObjectEntries<T, U = Required<T>> = {
  [K in keyof U]: [K, U[K] extends never ? undefined : U[K]]
}[keyof U]

type t = ObjectEntries<Partial<Model>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}


type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *  这一题希望我们将一个对象的所有键值对转换为一个个联合类型的元组数组
 *  原本的思路是 type ObjectEntries<T, K extends keyof T = keyof T> = K extends K ? [K, T[K]] : never
 *  在这个思路里面，我们首先用 K 存储 keyof T (因此 K 是一个联合类型)，然后我们使用 K extends K 来触发分布式特性
 *  但是这个思路无法度过测试 case Equal<ObjectEntries<Partial<Model>>, ModelEntries>>
 *  因为 Partial<Model> 的类型是 { name?: string | undefined; age?: number | undefined; locations?: string[] | null | undefined; }
 *  而不是 { name: string | undefined; age: number | undefined; locations: string[] | null | undefined; }
 *  所以我们最终得到的结果是 ['name', string | undefined] | ['age', number | undefined] | ['locations', string[] | null | undefined]
 *  我们希望去掉 undefined
 * 
 * 
 *  接下来诞生了第二系列的思路
 *  首先，数组转换成元组，我们可以直接使用 ['number'], 例如 ['1', '2']['number'] // '1' | '2'
 *  然后对象的所有 values 转换成元组，我们可以使用 T[keyof T]，例如 { name: string; age: number }[keyof { name: string; age: number }] // string | number
 *  所以我们的目的可以变成构造一个对象，这个对象的 key 是 keyof T，value 是 [key, T[key]]
 *  在具体实现中，我们额外增加了一个 U[K] extends never ? undefined : U[K] 判断来度过 { key?: undefined }
 *  因为 Required<{ key?: undefined }> 的结果是 { key: never }
 * 
 */