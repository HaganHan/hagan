/**
 * 散列表
 * 尽可能快的在数据结构中找到一个值
 */
import getType from './getType'
import toString from './toString'
import { add } from './math'
import { ValuePair } from './Dictionary'

 class HashTable {
  constructor () {
    this._table = {}
  }
  loseloseHashCode (key) {
    if (getType(key) === 'Number') return key
    const stringKey = toString(key)
    const arrayKey = [...stringKey]
    const asciiKey = arrayKey.map(item => item.codePointAt(0))
    const asciiCount = asciiKey.reduce((a, b) => add(a, b), 0)
    return asciiCount
  }
  getHashCode (key) {
    return this.loseloseHashCode(key)
  }
  put (key, value) {
    if (key == null || value == null) return false
    const tableKey = this.getHashCode(key)
    console.log(tableKey)
    this._table[tableKey] = new ValuePair(key, value)
    return true
  }
}

export default HashTable