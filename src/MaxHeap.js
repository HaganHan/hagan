/**
 * 二叉堆(最大堆)
 * 它是一颗完全二叉树，表示树的每一层都有左右节点，除了最后一层。并且最后一层的叶节点尽可能都是左侧子节点，这叫结构特性
 * 二叉堆不是最小堆就是最大堆，最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值，所有节点都大于等于最大堆或小于等于最小堆，这叫堆特性
 */
import MinHeap from './MinHeap'
import defaultCompare from './defaultCompare'

function reverseCompare (a, b) {
  return defaultCompare(b, a)
}

class MaxHeap extends MinHeap {
  constructor (compareFn = reverseCompare) {
    super(compareFn)
  }
}

export default MaxHeap