/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #medium #union

  ### Question

  Implement permutation type that transforms union types into the array that includes permutations of unions.

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > View on GitHub: https://tsch.js.org/296
*/

/* _____________ Your Code Here _____________ */

type Permutation<T, C = T> = [T] extends [never] ? 
  [] : 
  C extends T ? 
    [C, ...Permutation<Exclude<T, C>>] : 
    [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/296/answer
  > View solutions: https://tsch.js.org/296/solutions
  > More Challenges: https://tsch.js.org
*/

/**
 * Description:
 *  全排列的题目，这里我们先想象一下，假设我们输入的 union 是 'A' | 'B' | 'C'
 *  那么我们为了得到 'A' | 'B' | 'C' 的全排列，我们可以先固定 'A' 到开头，然后计算 'B' | 'C' 的全排列，然后将 'A' 和 'B' | 'C' 的全排列组合起来
 *  同理，我们可以再固定 'B' 到开头，然后执行一样的步骤...
 *  
 *  上述内容表达了这一题两个重要的思路：
 *    1. 需要进行递归（计算 'A' | 'B' | 'C' 的全排列，我们要计算 'B' | 'C', 'C' | 'A', 'A' | 'B' 的全排列）
 *    2. 需要分别固定每一个 union 的元素到开头 —— 利用 union 的 distributive 性质 
 *  
 *  开头的判断中，我们要判断 union 是否为空，但是我们没有使用 T extends never 的方式，而是使用了 [T] extends [never] 的方式。可以参考 https://juejin.cn/post/7165170011282079751#heading-14
 * 
 *  https://juejin.cn/post/7165170011282079751
 */