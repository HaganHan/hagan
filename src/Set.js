/**
 * 集合
 * 一种既没有重复元又有没有顺序概念的数组
 */

class Set {
  constructor () {
    this._data = {}
  }
  has (element) {
    return this._data.hasOwnProperty(element)
  }
  add (element) {
    if (this.has(element)) return false
    this._data[element] = element
    return true
  }
  delete (element) {
    if (!this.has(element)) return false
    delete this._data[element]
    return true
  }
  clear () {
    this._data = {}
  }
  size () {
    return Object.keys(this._data).length
  }
  values () {
    return Object.values(this._data)
  }
  union (set) { // 并集
    const unionSet = new Set()
    this.values().forEach(item => unionSet.add(item))
    set.values().forEach(item => unionSet.add(item))
    return unionSet
  }
  intersection (set) { // 交集
    const intersectionSet = new Set()
    if (this.size() <= set.size()) {
      this.values().forEach(item => {
        if (set.has(item)) intersectionSet.add(item)
      })
    } else {
      set.values().forEach(item => {
        if (this.has(item)) intersectionSet.add(item)
      })
    }
    return intersectionSet
  }
  difference (set) { // 差集
    const differenceSet = new Set()
    this.values().forEach(item => {
      if (!set.has(item)) differenceSet.add(item)
    })
    return differenceSet
  }
  isSubsetOf (set) { // 子集
    if (this.size() > set.size()) return false
    return this.values().every(item => {
      if (set.has(item)) return true
      return false
    })
  }
}

export default Set