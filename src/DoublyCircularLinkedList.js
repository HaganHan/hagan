/**
 * 双向循环链表
 * 双向循环链表和双向链表唯一的区别就是最后一个node节点的next指向第一个node节点，第一个node节点的prev属性指向最后一个node节点
 */
import defaultEquals from './defaultEquals'
import DoublyLinkedList, { DoublyLinkedNode } from './DoublyLinkedList'

class DoublyCircularLinkedList extends DoublyLinkedList {
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
  }
  unshift (element) {
    const node = new DoublyLinkedNode(element)
    if (this.isEmpty()) {
      node.next = node
      node.prev = node
      this._head = node
      this._tail = node
    } else {
      const firstNode = this._head
      const lastNode = this._tail

      node.next = firstNode
      node.prev = lastNode
      firstNode.prev = node
      lastNode.next = node
      this._head = node
    }
    this._length++
    return element
  }
  push (element) {
    const node = new DoublyLinkedNode(element)
    if (this.isEmpty()) {
      node.next = node
      node.prev = node
      this._head = node
      this._tail = node
    } else {
      const firstNode = this._head
      const lastNode = this._tail

      node.next = firstNode
      node.prev = lastNode
      firstNode.prev = node
      lastNode.next = node
      this._tail = node
    }
    this._length++
    return element
  }
  insert (element, index) {
    if (index < 0 || index > this.size()) return false
    const currentNode = new DoublyLinkedNode(element)
    if (index === 0) {
      this.unshift(element)
    } else if (index === this.size()) {
      this.push(element)
    } else {
      const previousNode = this.getNodeAt(index - 1)
      const nextNode = previousNode.next

      currentNode.next = nextNode
      currentNode.prev = previousNode
      previousNode.next = currentNode
      nextNode.prev = currentNode
      this._length++
    }
    return true
  }
  shift () {
    const firstNode = this._head
    if (this.size() === 1) {
      this._head = null
      this._tail = null
    } else {
      const secondNode = firstNode.next
      const lastNode = firstNode.prev
  
      lastNode.next = secondNode
      secondNode.prev = lastNode
      this._head = secondNode
    }
    this._length--
    return firstNode.element
  }
  pop () {
    const lastNode = this._tail
    if (this.size() === 1) {
      this._head = null
      this._tail = null
    } else {
      const penultimateNode = lastNode.prev
      const firstNode = this._head

      penultimateNode.next = firstNode
      firstNode.prev = penultimateNode
      this._tail = penultimateNode
    }
    this._length--
    return lastNode.element
  }
  removeAt (index) {
    if (index < 0 || index >= this.size()) return
    const node = this.getNodeAt(index)
    if (index === 0) {
      this.shift()
    } else if (index === this.size() - 1) {
      this.pop()
    } else {
      const previousNode = node.prev
      const nextNode = node.next

      previousNode.next = nextNode
      nextNode.prev = previousNode
      this._length--
    }
    return node.element
  }
}

export default DoublyCircularLinkedList