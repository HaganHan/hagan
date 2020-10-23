/**
 * 字典
 * 也叫映射、符号表、关联数组
 * 以key: value形式储存元素
 */
function toString (data) {
  if (typeof data === 'string') return data
  else if (data instanceof Object) return JSON.stringify(data)
  return String(data)
}

class ValuePair {
  constructor (key, value) {
    this.key = key
    this.value = value
  }
  toString () {
    return `[#${toString(this.key)}: ${toString(this.value)}}]`
  }
}

class Dictionary {
  constructor () {
    this._table = {}
  }
  hasKey (key) {
    const tableKey = typeof key === 'string' ? key : toString(key)
    return this._table[tableKey] != null
  }
  set (key, value) {
    if (key == null || value == null) return false
    const tableKey = toString(key)
    this._table[tableKey] = new ValuePair(key, value)
    return true
  }
  remove (key) {
    const tableKey = toString(key)
    if (!this.hasKey(tableKey)) return false
    delete this._table[tableKey]
    return true
  }
  get (key) {
    const tabkeKey = toString(key)
    if (!this.hasKey(tabkeKey)) return
    return this._table[tabkeKey].value
  }
  keyValues () {
    return Object.values(this._table)
  }
  keys () {
    return this.keyValues().map(valuePair => valuePair.key)
  }
  values () {
    return this.keyValues().map(valuePair => valuePair.value)
  }
  forEach (callback) {
    this.keyValues().forEach(valuePair => {
      callback(valuePair.value, valuePair.key, valuePair)
    })
  }
  get size () {
    return Object.keys(this._table).length
  }
  isEmpty () {
    return this.size === 0
  }
  clear () {
    this._table = {}
  }
  toString () {
    if (this.isEmpty()) return ''
    let result = ''
    this.forEach((value, key, valuePair) => result += valuePair.toString())
    return result
  }
}

export default Dictionary
