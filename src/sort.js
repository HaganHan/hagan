/**
 * 排序
 */
import defaultCompare from './defaultCompare'

/**
 * 冒泡排序
 * O(n²)
 */
function bubbleSort (array, compareFn = defaultCompare) {
  const arr = [...array]
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (compareFn(arr[j], arr[j + 1]) === 1) {
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
function selectionSort (array, compareFn = defaultCompare) {
  const arr = [...array]
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i; j < arr.length; j++) {
      if (compareFn(arr[j], arr[minIndex]) === -1) {
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
function insertionSort (array, compareFn = defaultCompare) {
  const arr = [...array]
  const { length } = arr
  for (let i = 1; i < length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const compare = compareFn(arr[i], arr[j])
      if (compare === 1 || compare === 0) {
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
function merge (leftArr, rightArr, compareFn) {
  const arr = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    const compare = compareFn(leftArr[0], rightArr[0])
    if (compare === -1 || compare === 0) {
      arr.push(leftArr.shift())
    } else {
      arr.push(rightArr.shift())
    }
  }
  while (leftArr.length !== 0) {
    arr.push(leftArr.shift())
  }
  while (rightArr.length !== 0) {
    arr.push(rightArr.shift())
  }
  return arr
}
function mergeSort (array, compareFn = defaultCompare) {
  let arr = [...array]
  const { length } = arr
  if (length > 1) {
    const middleIndex = Math.floor(length / 2)
    const leftArr = mergeSort(arr.slice(0, middleIndex), compareFn)
    const rightArr = mergeSort(arr.slice(middleIndex, length), compareFn)
    arr = merge(leftArr, rightArr, compareFn)
  }
  return arr
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
 */
function quickSort (array, compareFn = defaultCompare) {
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
      while (compareFn(arr[rightIndex], tmp) === 1) {
        rightIndex--
        if (leftIndex === rightIndex) break out
      }
      arr[leftIndex] = arr[rightIndex]
      leftIndex++
    } else {
      while (compareFn(arr[leftIndex], tmp) === -1) {
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
    rightArr = quickSort(arr)
  } else if (endIndex === length - 1) {
    arr[endIndex] = tmp
    rightArr = [arr.pop()]
    leftArr = quickSort(arr)
  } else {
    arr[endIndex] = tmp
    leftArr = quickSort(arr.slice(0, endIndex))
    rightArr = quickSort(arr.slice(endIndex, length))
  }
  return leftArr.concat(rightArr)
}

const sort = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort
}

export default sort