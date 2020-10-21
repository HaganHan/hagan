/**
 * 链表
 * 类似寻宝游戏
 * 宝藏1里存着宝藏2的地点，宝藏2存着宝藏3的地点，想要找到宝藏3必须先从第一个开始找
 */

export function defaultEquals (a, b) {
  return a === b
}

export class LinkedNode {
  constructor (element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  constructor (_equalsFn = defaultEquals) {
    this._length = 0 // 链表的元素数量
    this._head = null
    this._equalsFn = _equalsFn
  }
  getNodeAt (index) {
    if (index < 0 || index >= this.size()) return
    let currentNode = this._head
    for (let i = 0; i < index; i ++) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  push (element) {
    const node = new LinkedNode(element)
    if (this.isEmpty()) {
      this._head = node
    } else {
      const lastNode = this.getNodeAt(this.size() - 1)
      lastNode.next = node
    }
    this._length++
    return element
  }
  pop () {
    const lastNode = this.getNodeAt(this.size() - 1)
    if (this.size() === 1) {
      this._head = null
    } else {
      const penultimateNode = this.getNodeAt(this.size() - 2)
      penultimateNode.next = null
    }
    this._length--
    return lastNode.element
  }
  peekTail () {
    return this.getNodeAt(this.size () - 1).element
  }
  unshift (element) {
    const node = new LinkedNode(element)
    if (this.isEmpty()) {
      this._head = node
    } else {
      const firstNode = this._head
      node.next = firstNode
      this._head = node
    }
    this._length++
    return element
  }
  shift () {
    const firstNode = this._head
    if (this.size() === 1) {
      this._head = null
    } else {
      this._head = firstNode.next
    }
    this._length--
    return firstNode.element
  }
  peekHead () {
    return this._head.element
  }
  insert (element, index) {
    if (index < 0 || index > this.size()) return false
    const node = new LinkedNode(element)
    if (index === 0) {
      this.unshift(element)
    } else if (index === this.size()) {
      this.push(element)
    } else {
      const previousNode = this.getNodeAt(index - 1)
      const nextNode = previousNode.next
      previousNode.next = node
      node.next = nextNode
      this._length++
    }
    return true
  }
  indexOf (element) {
    let currentNode = this._head
    for (let i = 0; i < this.size(); i++) {
      if (this._equalsFn(element, currentNode.element)) return i
      currentNode = currentNode.next
    }
    return -1
  }
  removeAt (index) {
    if (index < 0 || index >= this.size()) return undefined
    let currentNode = this.getNodeAt(index)
    if (index === 0) {
      this.shift()
    } else if (index === this.size() - 1) {
      this.pop()
    } else {
      let previousNode = this.getNodeAt(index - 1)
      let nextNode = currentNode.next
      previousNode.next = nextNode
      this._length--
    }
    return currentNode.element
  }
  remove (element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  size () {
    return this._length
  }
  isEmpty () {
    return this.size() === 0
  }
  toString () {
    if (this.isEmpty()) return ''
    let currentNode = this._head
    let string = currentNode.element.toString()
    for (let i = 1; i < this.size(); i++) {
      currentNode = currentNode.next
      if (currentNode.element) string += `,${currentNode.element.toString()}`
    }
    return string
  }
}

export default LinkedList