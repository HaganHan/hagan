/**
 * 二叉堆(最大堆)
 * 它是一颗完全二叉树，表示树的每一层都有左右节点，除了最后一层。并且最后一层的叶节点尽可能都是左侧子节点，这叫结构特性
 * 二叉堆不是最小堆就是最大堆，最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值，所有节点都大于等于最大堆或小于等于最小堆，这叫堆特性
 */
import MinHeap from './MinHeap'
import getType from "./getType";

function defaultCompare (a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}

class MaxHeap extends MinHeap {
  constructor (compareFn = defaultCompare) {
    super(compareFn)
  }
  // 上移操作: 将值和父节点交换，直到父节点大于这个插入的值为止
  _siftUp (index) {
    if (index <= 0) return
    let parentNodeIndex = this._getParentNodeIndex(index)
    while (this.compareFn(this._heap[index], this._heap[parentNodeIndex]) === 1 && getType(parentNodeIndex) === 'Number') {
      // 交换
      [this._heap[index], this._heap[parentNodeIndex]] = [this._heap[parentNodeIndex], this._heap[index]]

      index = parentNodeIndex
      parentNodeIndex = this._getParentNodeIndex(index)
    }
  }
  // 下移操作
  siftDown (index) {
    if (index >= this.size) return
    const leftChildNodeIndex = this._getLeftChildNodeIndex(index)
    const rightChildNodeIndex = this._getRightChildNodeIndex(index)

    let targetNodeIndex = index
    let targetNodeValue = this._heap[targetNodeIndex]

    if (leftChildNodeIndex < this.size) {
      const leftChildNodeValue = this._heap[leftChildNodeIndex]
      if (this.compareFn(targetNodeValue, leftChildNodeValue) === -1) {
        targetNodeIndex = leftChildNodeIndex
        targetNodeValue = leftChildNodeValue
      }
    }
    if (rightChildNodeIndex < this.size) {
      const rightChildNodeValue = this._heap[rightChildNodeIndex]
      if (this.compareFn(targetNodeValue, rightChildNodeValue) === -1) {
        targetNodeIndex = rightChildNodeIndex
      }
    }

    if (index !== targetNodeIndex) {
      [this._heap[index], this._heap[targetNodeIndex]] = [this._heap[targetNodeIndex], this._heap[index]]
    }
    this.siftDown(leftChildNodeIndex)
    this.siftDown(rightChildNodeIndex)
  }
}

export default MaxHeap