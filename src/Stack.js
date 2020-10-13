/**
 * 封装栈
 */

class Stack {
  #data
  #length
  constructor () {
    this.#data = {}
    this.#length = 0
  }
  push (element) {
    this.#data[this.#length] = element
    this.#length++
  }
  pop () {
    if (this.isEmpty()) return undefined
    const target = this.#data[this.#length - 1]
    delete this.#data[this.#length - 1]
    this.#length--
    return target
  }
  peek () {
    if (this.isEmpty()) return undefined
    return this.#data[this.#length - 1]
  }
  isEmpty () {
    return this.#length === 0
  }
  size () {
    return this.#length
  }
  clear () {
    this.#data = {}
    this.#length = 0
  }
  toString () {
    if (this.isEmpty()) return ''
    let string = ''
    Array(this.#length).fill().map((item, index) => index).forEach(key => {
      if (key !== this.#length - 1) {
        string += `${this.#data[key]},`
      } else {
        string += `${this.#data[key]}`
      }
    })
    return string
  }
}

export default Stack