/**
 * 双向链表
 * 普通链表的node节点只有向下一个node节点的链接，而双向列表在此基础上增加了向上一个node节点的链接
 */
import LinkedList, { LinkedNode, defaultEquals } from './LinkedList'

export class DoublyNode extends LinkedNode {
  constructor (element) {
    super(element)
    this.prev = null
  }
}

class DoublyLinkedList extends LinkedList {
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
    this._tail = null
  }
  push (element) {
    const node = new DoublyNode(element)
    if (this.isEmpty()) {
      this._head = node
      this._tail = node
    } else {
      const lastNode = this.getNodeAt(this.size() - 1)
      lastNode.next = node
      node.prev = lastNode
      this._tail = node
    }
    this._length++
    return element
  }
  pop () {
    const lastNode = this._tail
    if (this.size() === 1) {
      this._head = null
      this._tail = null
    } else {
      const penultimateNode = this._tail.prev
      penultimateNode.next = null
      this._tail = penultimateNode
    }
    this._length--
    return lastNode.element
  }
  peekTail () {
    return this._tail
  }
  unshift (element) {
    const node = new DoublyNode(element)
    if (this.isEmpty()) {
      this._head = node
      this._tail = node
    } else {
      const firstNode = this._head
      firstNode.prev = node
      this._head = node
      this._head.next = firstNode
    }
    this._length++
    return element
  }
  shift () {
    const firstNode = this._head
    if (this.size() === 1) {
      this._head = null
      this._tail = null
    } else {
      const secondNode = firstNode.next
      secondNode.prev = null
      this._head = secondNode
    }
    this._length--
    return firstNode.element
  }
  peekHead () {
    return this._head
  }
  insert (element, index) {
    if (index < 0 || index > this.size()) return false
    const node = new DoublyNode(element)
    if (index === 0) {
      this.unshift(element)
    } else if (index === this.size()) {
      this.push(element)
    } else {
      const previousNode = this.getNodeAt(index - 1)
      const nextNode = previousNode.next
      previousNode.next = node
      node.prev = previousNode
      node.next = nextNode
      nextNode.prev = node
      this._length++
    }
    return true
  }
  removeAt (index) {
    if (index < 0 || index >= this.size()) return
    const node = this.getNodeAt(index)
    if (index === 0) {
      this.shift()
    } else if (index === this.size() - 1) {
      this.pop()
    } else {
      const frontNode = this.getNodeAt(index - 1)
      const backNode = this.getNodeAt(index + 1)
      frontNode.next = backNode
      backNode.prev = frontNode
      this._length--
    }
    return node.element
  }
}

export default DoublyLinkedList