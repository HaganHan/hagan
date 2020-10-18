/**
 * 双端队列
 * 先进可以先出也可以后出，不限制自由
 */
class Deque {
  constructor () {
    this._firstIndex = 0
    this._lastIndex = 0
    this._data = {}
  }
  size () {
    return this._lastIndex - this._firstIndex
  }
  isEmpty () {
    return this.size() === 0
  }
  unshift (element) {
    if (this.isEmpty()) return this.push(element)

    if (this._firstIndex > 0) {
      this._firstIndex--
      this._data[this._firstIndex] = element
    } else {
      for (let i = this._lastIndex; i > 0; i--) {
        this._data[i] = this._data[i - 1]
      }
      this._lastIndex++
      this._firstIndex = 0
      this._data[0] = element
    }
    return element
  }
  shift () {
    const result = this._data[this._firstIndex]
    delete this._data[this._firstIndex]
    this._firstIndex++
    return result
  }
  peekHead () {
    return this._data[this._firstIndex]
  }
  push (element) {
    this._data[this._lastIndex] = element
    this._lastIndex++
    return element
  }
  pop () {
    const result = this._data[this._lastIndex]
    delete this._data[this._lastIndex]
    this._lastIndex--
    return result
  }
  peekTail () {
    return this._data[this._lastIndex]
  }
  clear () {
    this._firstIndex = 0
    this._lastIndex = 0
    this._data = {}
  }
  toString () {
    if (this.isEmpty()) return undefined
    let string = this._data[this._firstIndex].toString()
    for (let i = this._firstIndex + 1; i < this._lastIndex; i++) {
      string += `,${this._data[i]}`
    }
    return string
  }
}

export default Deque