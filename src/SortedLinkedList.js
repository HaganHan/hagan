/**
 * 有序链表
 */
import { times } from 'lodash'
import LinkedList, { defaultEquals } from './LinkedList'

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

function defaultCompare (a, b) {
  if (a === b) return 0
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class SortedLinkedList extends LinkedList {
  constructor (equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn)
    this.compareFn = compareFn
  }
  insert (element, index = 0) { // TODO: 还没写完
    if (this.isEmpty()) {
      this.unshift(element)
    }
    this._length++
  }
}

export default SortedLinkedList