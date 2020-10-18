/**
 * 队列
 * 先进先出，后进后出，类似排队、下雨
 */

class Queue {
  constructor () {
    this._frontIndex = 0
    this._backIndex = 0
    this._data = {}
  }
  size () {
    return this._backIndex - this._frontIndex
  }
  isEmpty () {
    return this.size() === 0
  }
  enqueue (element) {
    this._data[this._backIndex] = element
    this._backIndex++
    return element
  }
  dequeue () {
    if (this.isEmpty()) return undefined
    const result = this._data[this._frontIndex]
    delete this._data[this._frontIndex]
    this._frontIndex++
    return result
  }
  peek () {
    if (this.isEmpty()) return undefined
    return this._data[this._frontIndex]
  }
  clear () {
    this._frontIndex = 0
    this._backIndex = 0
    this._data = {}
  }
  toString () {
    if (this.isEmpty()) return undefined
    let string = this._data[this._frontIndex].toString()
    for (let i = this._frontIndex + 1; i < this._backIndex; i++) {
      string += `,${this._data[i]}`
    }
    return string
  }
}

export default Queue