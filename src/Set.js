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
}

export default Set