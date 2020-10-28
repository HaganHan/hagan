/**
 * 斐波那契数列
 * 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
 */
import { add } from './math'
import getType from './getType'
import toString from './toString'

// 用字典缓存结果，避免重复计算相同的值
const map = new Map([
  ['0', '0'],
  ['1', '1']
])

function fibonacci (index) {
  const mapKey = toString(index)
  const mapValue = map.get(mapKey)
  if (getType(mapValue) === 'String') return mapValue
  const prepreValue = fibonacci(BigInt(mapKey) - BigInt(2))
  const preValue = fibonacci(BigInt(mapKey) - BigInt(1))
  const value = add(prepreValue, preValue)
  map.set(mapKey, value)
  return value
}

export default fibonacci
