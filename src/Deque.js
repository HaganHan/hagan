/**
 * 双端队列
 * 先进可以先出也可以后出，不限制自由
 */
class Deque {
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
  addFront (element) {
    if (this.isEmpty()) return this.addBack(element)

    if (this._frontIndex > 0) {
      this._frontIndex--
      this._data[this._frontIndex] = element
    } else {
      for (let i = this._backIndex; i > 0; i--) {
        this._data[i] = this._data[i - 1]
      }
      this._backIndex++
      this._frontIndex = 0
      this._data[0] = element
    }
  }
  addBack (element) {
    this._data[this._backIndex] = element
    this._backIndex++
  }
  removeFront () {
    const result = this._data[this._frontIndex]
    delete this._data[this._frontIndex]
    this._frontIndex++
    return result
  }
  removeBack () {
    const result = this._data[this._backIndex]
    delete this._data[this._backIndex]
    this._backIndex--
    return result
  }
  peekFront () {
    return this._data[this._frontIndex]
  }
  peekBack () {
    return this._data[this._backIndex]
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

export default Deque