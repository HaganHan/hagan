/**
 * 有序链表
 * 使用排序算法将元素进行排序
 */
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
  getIndexNextSortedElement (element) {
    let current = this._head
    let index = 0
    for (; index < this.size(); index++) {
      const compare = this.compareFn(element, current.element)
      if (compare === Compare.LESS_THAN) return index
      current = current.next
    }
    return index
  }
  insert (element) {
    if (this.isEmpty()) return super.insert(element, 0)
    const index = this.getIndexNextSortedElement(element)
    return super.insert(element, index)
  }
  // 没找到可以阻止push、unshift被调用的办法，因此使用push、unshift便会打破排序规则
}

export default SortedLinkedList