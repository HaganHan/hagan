/**
 * 队列
 */

class Queue {
  constructor () {
    this._beforeIndex = 0
    this._afterIndex = 0
    this._data = {}
  }
  size () {
    return this._afterIndex - this._beforeIndex
  }
  isEmpty () {
    return this.size() === 0
  }
  enqueue (element) {
    this._data[this._afterIndex] = element
    this._afterIndex++
  }
  dequeue () {
    if (this.isEmpty()) return undefined
    const result = this._data[this._beforeIndex]
    delete this._data[this._beforeIndex]
    this._beforeIndex++
    return result
  }
  peek () {
    if (this.isEmpty()) return undefined
    return this._data[this._beforeIndex]
  }
  clear () {
    this._data = {}
    this._beforeIndex = 0
    this._afterIndex = 0
  }
  toString () {
    if (this.isEmpty()) return undefined
    let string = this._data[this._beforeIndex].toString()
    for (let i = this._beforeIndex + 1; i < this._afterIndex; i++) {
      string += `,${this._data[i]}`
    }
    return string
  }
}

export default Queue