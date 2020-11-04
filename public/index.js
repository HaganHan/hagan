import hagan from '../src/hagan'

/**
 * 二叉堆(最小堆)
 * 它是一颗完全二叉树，表示树的每一层都有左右节点，除了最后一层。并且最后一层的叶节点尽可能都是左侧子节点，这叫结构特性
 * 二叉堆不是最小堆就是最大堆，最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值，所有节点都大于等于最大堆或小于等于最小堆，这叫堆特性
 */
const minHeap = new hagan.MinHeap()
minHeap.insert(2)
minHeap.insert(3)
minHeap.insert(21)
minHeap.insert(4)
minHeap.insert(5)
minHeap.insert(15)
minHeap.insert(17)
minHeap.insert(1)
minHeap.insert(11)
minHeap.insert(7)
minHeap.insert(32)
minHeap.insert(9)
minHeap.insert(6)
minHeap.insert(16)
minHeap.insert(8)
minHeap.insert(10)

console.log(minHeap.extract())
console.log(minHeap)

