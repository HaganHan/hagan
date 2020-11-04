/**
 * 排序
 */
import defaultCompare from './defaultCompare'

/**
 * 堆排序
 * TODO:没写完
 */
function siftDown (array, internalNodeIndex, compareFn) {
  let childNodeIndex = internalNodeIndex * 2 + 1
  while (childNodeIndex < array.length) {
    if (childNodeIndex + 1 < array.length) {

    }
  }
}
function heapSort (array, compareFn = defaultCompare) {
  for (let internalNodeIndex = Math.floor((array.length / 2) - 1); internalNodeIndex >= 0; internalNodeIndex--) {
    siftDown(array, internalNodeIndex, compareFn)
  }
  console.log(array)
}

const sort = {}

export default sort