/**
 * 链表
 * 类似寻宝游戏
 * 宝藏1里存着宝藏2的地点，宝藏2存着宝藏3的地点，想要找到宝藏3必须先从第一个开始找
 */

function defaultEquals (a, b) {
  return a === b
}

class Node {
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
    const node = new Node(element)
    let currentNode
    if (!this._head) {
      this._head = node
    } else {
      currentNode = this._head
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = node
    }
    this._length++
  }
  insert (element, index) {
    if (index < 0 || index > this.size()) return false
    const node = new Node(element)
    if (index === 0) {
      node.next = this._head
      this._head = node
      return true
    }
    const previousNode = this.getNodeAt(index - 1)
    const nextNode = previousNode.next
    previousNode.next = node
    node.next = nextNode
    this._length++
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
    let currentNode = this._head
    if (index === 0) {
      this._head = currentNode.next
    } else {
      let previousNode = this.getNodeAt(index - 1)
      let nextNode = this.getNodeAt(index + 1)
      previousNode.next = nextNode
    }
    this._length--
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
  getHead () {
    return this._head
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