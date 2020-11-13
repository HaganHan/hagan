/**
 * 排序
 */
import defaultCompare from './defaultCompare'

/**
 * 冒泡排序
 * O(n²)
 */
export function bubbleSort (array, compareFn = defaultCompare) {
  const arr = [...array]
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (compareFn(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

/**
 * 选择排序
 * O(n²)
 */
export function selectionSort (array, compareFn = defaultCompare) {
  const arr = [...array]
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i; j < arr.length; j++) {
      if (compareFn(arr[j], arr[minIndex]) < 0) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}

/**
 * 插入排序
 * O(n²)
*/
export function insertionSort (array, compareFn = defaultCompare) {
  const arr = [...array]
  const { length } = arr
  for (let i = 1; i < length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const compare = compareFn(arr[i], arr[j])
      if (compare >= 0) {
        const [element] = arr.splice(i, 1)
        arr.splice(j + 1, 0, element)
        break
      }
      if (j === 0) {
        const [element] = arr.splice(i, 1)
        arr.unshift(element)
        break
      }
    }
  }
  return arr
}

/**
 * 归并排序
 * O(n)
 */
export function mergeSort (array, compareFn = defaultCompare) {
  const { length } = array
  if (length <= 1) return array
  const middleIndex = Math.floor(length / 2)
  const leftArr = mergeSort(array.slice(0, middleIndex), compareFn)
  const rightArr = mergeSort(array.slice(middleIndex, length), compareFn)
  const mergeArr = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    const compare = compareFn(leftArr[0], rightArr[0])
    if (compare <= 0) {
      mergeArr.push(leftArr.shift())
    } else {
      mergeArr.push(rightArr.shift())
    }
  }
  while (leftArr.length !== 0) {
    mergeArr.push(leftArr.shift())
  }
  while (rightArr.length !== 0) {
    mergeArr.push(rightArr.shift())
  }
  return mergeArr
}

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

/**
 * 快速排序
 * 速度较快，通用性最高
 */
export function quickSort (array, compareFn = defaultCompare) {
  let arr = [...array]
  const { length } = arr
  if (length < 2) return arr

  let tmp = arr[0]
  let leftIndex = 0
  let rightIndex = length - 1
  let isEnd = true

  out:
  while (leftIndex !== rightIndex) {
    if (isEnd) {
      while (compareFn(arr[rightIndex], tmp) > 0) {
        rightIndex--
        if (leftIndex === rightIndex) break out
      }
      arr[leftIndex] = arr[rightIndex]
      leftIndex++
    } else {
      while (compareFn(arr[leftIndex], tmp) < 0) {
        leftIndex++
        if (leftIndex === rightIndex) break out
      }
      arr[rightIndex] = arr[leftIndex]
      rightIndex--
    }
    isEnd = !isEnd
  }

  const endIndex = leftIndex
  let leftArr
  let rightArr
  if (endIndex === 0) {
    leftArr = [arr.shift()]
    rightArr = quickSort(arr, compareFn)
  } else if (endIndex === length - 1) {
    arr[endIndex] = tmp
    rightArr = [arr.pop()]
    leftArr = quickSort(arr, compareFn)
  } else {
    arr[endIndex] = tmp
    leftArr = quickSort(arr.slice(0, endIndex), compareFn)
    rightArr = quickSort(arr.slice(endIndex, length), compareFn)
  }
  return leftArr.concat(rightArr)
}

/**
 * 计数排序(整数排序算法)
 * O(n+k)
 * k为临时计数数组的大小
 * 计数排序只能对整数进行排序
 */
export function countionSort (array) {
  const arr = [...array]
  const { length } = arr
  if (length <= 1) return arr
  const maxValue = Math.max(...arr)
  const countionArr = new Array(maxValue + 1).fill(0)
  arr.forEach(item => countionArr[item]++)
  let arrIndex = 0
  countionArr.forEach((value, index) => {
    while (value > 0) {
      arr[arrIndex] = index
      value--
      arrIndex++
    }
  })
  return arr
}

/**
 * 桶排序(整数排序算法)
 * 箱排序
 * 分布式排序算法
 */
export function bucketSort (array, bucketSize = 5) {
  if (array.length === 0) return array
  const minValue = Math.min(...array) // 1
  const maxValue = Math.max(...array) // 22
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1 // 5
  const buckets = new Array(bucketCount).fill().map(() => [])
  array.forEach(item => {
    const index = Math.floor((item - minValue) / bucketSize)
    buckets[index].push(item)
  })
  const arr = []
  buckets.forEach((itemArr, index) => {
    // 插入排序
    for (let i = 1; i < itemArr.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (j === 0 && itemArr[i] <= itemArr[j]) {
          itemArr.unshift(itemArr.splice(i, 1)[0])
          break
        }
        if (itemArr[i] > itemArr[j]) {
          itemArr.splice(j + 1, 0, itemArr.splice(i, 1)[0])
          break
        }
      }
    }
    itemArr.forEach(item => arr.push(item))
  })
  return arr
}

/**
 * 基数排序(整数排序算法)
 * 分布式排序算法
 * TODO
 */

const sort = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  countionSort,
  bucketSort
}

export default sort