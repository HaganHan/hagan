/**
 * 栈
 * 先进后出，后进先出，类似子弹上膛
 * O(1)
 */
// const _weakMap = new WeakMap()
// const _data = {}
// const _length = {}

// class Stack {
//   constructor () {
//     _weakMap.set(_data, {})
//     _weakMap.set(_length, 0)
//   }
//   push (element) {
//     const data = _weakMap.get(_data)
//     const length = _weakMap.get(_length)
//     data[length] = element
//     _weakMap.set(_length, length + 1)
//     return element
//   }
//   pop () {
//     if (this.isEmpty()) return undefined
//     const data = _weakMap.get(_data)
//     const length = _weakMap.get(_length)
//     const target = data[length - 1]
//     delete data[length - 1]
//     _weakMap.set(_length, length - 1)
//     return target
//   }
//   peek () {
//     if (this.isEmpty()) return undefined
//     const data = _weakMap.get(_data)
//     const length = _weakMap.get(_length)
//     return data[length - 1]
//   }
//   isEmpty () {
//     return _weakMap.get(_length) === 0
//   }
//   size () {
//     return _weakMap.get(_length)
//   }
//   clear () {
//     _weakMap.set(_data, {})
//     _weakMap.set(_length, 0)
//   }
//   toString () {
//     if (this.isEmpty()) return ''
//     let string = ''
//     const data = _weakMap.get(_data)
//     const length = _weakMap.get(_length)
//     Array(length).fill().map((item, index) => index).forEach(key => {
//       if (key !== length - 1) {
//         string += `${data[key]},`
//       } else {
//         string += `${data[key]}`
//       }
//     })
//     return string
//   }
// }

// class Stack {
//   #data
//   #length
//   constructor () {
//     this.#data = {}
//     this.#length = 0
//   }
//   push (element) {
//     this.#data[this.#length] = element
//     this.#length++
//   }
//   pop () {
//     if (this.isEmpty()) return undefined
//     const target = this.#data[this.#length - 1]
//     delete this.#data[this.#length - 1]
//     this.#length--
//     return target
//   }
//   peek () {
//     if (this.isEmpty()) return undefined
//     return this.#data[this.#length - 1]
//   }
//   isEmpty () {
//     return this.#length === 0
//   }
//   size () {
//     return this.#length
//   }
//   clear () {
//     this.#data = {}
//     this.#length = 0
//   }
//   toString () {
//     if (this.isEmpty()) return ''
//     let string = ''
//     Array(this.#length).fill().map((item, index) => index).forEach(key => {
//       if (key !== this.#length - 1) {
//         string += `${this.#data[key]},`
//       } else {
//         string += `${this.#data[key]}`
//       }
//     })
//     return string
//   }
// }

class Stack {
  constructor () {
    this._data = {}
    this._length = 0
  }
  push (element) {
    this._data[this._length] = element
    this._length++
  }
  pop () {
    if (this.isEmpty()) return undefined
    const target = this._data[this._length - 1]
    delete this._data[this._length - 1]
    this._length--
    return target
  }
  peek () {
    if (this.isEmpty()) return undefined
    return this._data[this._length - 1]
  }
  isEmpty () {
    return this._length === 0
  }
  size () {
    return this._length
  }
  clear () {
    this._data = {}
    this._length = 0
  }
  toString () {
    if (this.isEmpty()) return ''
    let string = ''
    Array(this._length).fill().map((item, index) => index).forEach(key => {
      if (key !== this._length - 1) {
        string += `${this._data[key]},`
      } else {
        string += `${this._data[key]}`
      }
    })
    return string
  }
}

export default Stack