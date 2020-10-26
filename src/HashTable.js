/**
 * 散列表
 * 尽可能快的在数据结构中找到一个值
 */
import getType from './getType'
import toString from './toString'
import { add } from './math'
import { ValuePair } from './Dictionary'
import LinkedList from './LinkedList'
import { times } from 'lodash'

class HashTable {
  constructor () {
    this._table = {}
  }
  loseloseHashCode (key) {
    if (getType(key) === 'Number') return key
    const stringKey = toString(key)
    const arrayKey = [...stringKey]
    const asciiKey = arrayKey.map(item => item.codePointAt(0))
    const asciiCount = asciiKey.reduce((a, b) => add(a, b))
    return asciiCount
  }
  getHashCode (key) {
    return this.loseloseHashCode(key)
  }
  // 这里的put方法存在一个问题，就是 name 与 anme 最后得到的hashCode相同，这样会导致后保存的结果会覆盖之前的结果
  // 解决办法有两种: 1.分离链接法 2.线性探索法
  // put (key, value) {
  //   if (key == null || value == null) return false
  //   const tableKey = this.getHashCode(key)
  //   this._table[tableKey] = new ValuePair(key, value)
  //   return true
  // }

  /**
   * 分离链接法
   */
  // put (key, value) {
  //   if (key == null || value == null) return false
  //   const tableKey = this.getHashCode(key)
  //   if (!(this._table[tableKey] instanceof LinkedList)) {
  //     this._table[tableKey] = new LinkedList()
  //   }
  //   this._table[tableKey].push(new ValuePair(key, value))
  //   return true
  // }

  /**
   * 线性探索法
   */
  put (key, value) {
    if (key == null || value == null) return false
    const tableKey = this.getHashCode(key)
    if (!(this._table[tableKey] instanceof ValuePair)) {
      this._table[tableKey] = new ValuePair(key, value)
      return true
    }
    let index = add(tableKey, 1)
    while (this._table[index] instanceof ValuePair) {
      index = add(index, 1)
    }
    this._table[index] = new ValuePair(key, value)
    return true
  }
  get (key) {
    const tableKey = this.getHashCode(key)
    const linkedList = this._table[tableKey]
    if (!(linkedList instanceof LinkedList)) return
    let currentLinkedNode = linkedList.getNodeAt(0)
    while (currentLinkedNode !== null) {
      if (currentLinkedNode.element.key === key) return currentLinkedNode.element.value
      currentLinkedNode = currentLinkedNode.next
    }
    return
  }
  remove (key) { // TODO
    const tableKey = this.getHashCode(key)
    const linkedList = this._table[tableKey]
    if (linkedList instanceof LinkedList) {
      let index = 0
      let currentLinkedNode = linkedList.getNodeAt(index)
      while (index < linkedList.size()) {
        if (currentLinkedNode.element.key === key) {
          linkedList.remove(currentLinkedNode.element)
          if (linkedList.size() === 0) {
            delete this._table[tableKey]
          }
          return true
        }
        currentLinkedNode = currentLinkedNode.next
        index++
      }
    }
    return false
  }
}

export default HashTable