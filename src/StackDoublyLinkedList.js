/**
 * 栈(双向链表实现版)
 * 先进后出，后进先出，类似子弹上膛
 * O(1)
 */
import DoublyLinkedList from './DoublyLinkedList'

class StackDoublyLinkedList {
  constructor () {
    this._data = new DoublyLinkedList()
  }
  push (element) {
    return this._data.push(element)
  }
  pop () {
    return this._data.pop()
  }
  peek () {
    return this._data.peekTail()
  }
  isEmpty () {
    return this._data.isEmpty()
  }
  size () {
    return this._data.size()
  }
  clear () {
    this._data.clear()
  }
  toString () {
    return this._data.toString()
  }
}

export default StackDoublyLinkedList