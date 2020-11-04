/**
 * 有序链表
 * 使用排序算法将元素进行排序
 */
import LinkedList, { defaultEquals, LinkedNode } from './LinkedList'
import defaultCompare from './defaultCompare'

class SortedLinkedList extends LinkedList {
  constructor (equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn)
    this.compareFn = compareFn
  }
  getIndexNextSortedElement (element) {
    let current = this._head
    let index = 0
    for (; index < this.size(); index++) {
      const compare = this.compareFn(element, current.element)
      if (compare === -1) return index
      current = current.next
    }
    return index
  }
  push (element) {
    this.insert(element)
  }
  unshift (element) {
    this.insert(element)
  }
  insert (element) {
    const node = new LinkedNode(element)
    if (this.isEmpty()) {
      this._head = node
    } else {
      const index = this.getIndexNextSortedElement(element)
      if (index === 0) {
        const firstNode = this._head
        this._head = node
        node.next = firstNode
      } else if (index === this.size()) {
        const lastNode = this.getNodeAt(index -1)
        lastNode.next = node
      } else {
        const previousNode = this.getNodeAt(index - 1)
        const nextNode = previousNode.next
        previousNode.next = node
        node.next = nextNode
      }
    }
    this._length++
    return true
  }
}

export default SortedLinkedList