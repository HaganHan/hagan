/**
 * 斐波那契数列
 */
import { add } from './math'

function fibonacci (index) {
  const position = BigInt(index)
  if (position === BigInt(0)) return BigInt(0)
  if (position === BigInt(1)) return BigInt(1)
  return add(fibonacci(position - BigInt(2)), fibonacci(position - BigInt(1)))
}

export default fibonacci
