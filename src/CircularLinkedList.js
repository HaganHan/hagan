/**
 * 循环链表
 * 循环链表和链表唯一的区别就是最后一个node节点的next指向第一个node节点
 */

import LinkedList, { LinkedNode, defaultEquals } from './LinkedList'

class CircularLinkedList extends LinkedList {
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
  }
  push (element) {
    const node = new LinkedNode(element)
    if (this.isEmpty()) {
      this._head = node
      this._head.next = node
    } else {
      const lastNode = this.getNodeAt(this.size() - 1)
      lastNode.next = node
      node.next = this._head
    }
    this._length++
    return element
  }
  pop () {
    const penultimateNode = this.getNodeAt(this.size() - 2)
    const lastNode = penultimateNode.next
    penultimateNode.next = this._head
    this._length--
    return lastNode.element
  }
  unshift (element) {
    const node = new LinkedNode(element)
    if (this.isEmpty()) {
      this._head = node
      this._head.next = node
      this._length++
    } else {
      node.next = this._head
      this._head = node
      this._length++
      const lastNode = this.getNodeAt(this.size() - 1)
      lastNode.next = this._head
    }
    return element
  }
  shift () {
    const firstNode = this._head
    const secondNode = firstNode.next
    const lastNode = this.getNodeAt(this.size() - 1)
    this._head = secondNode
    lastNode.next = secondNode
    this._length--
    return firstNode.element
  }
}

export default CircularLinkedList