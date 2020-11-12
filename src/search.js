/**
 * 搜索
 */
import defaultEquals from './defaultEquals'
import defaultCompare from './defaultCompare'
import sort from './sort'

/**
 * 顺序搜索(线性搜索)
 * sequentialSearch([ 5, 3, 1, 2, 6 ], 2)
 * sequentialSearch([ {name: 'hagan' }, { name: 'rita' } ], { name: 'hagan' }, (current, item) => current.name === item.name)
 */
function sequentialSearch (array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(array[i], value)) return i
  }
  return -1
}

/**
 * 二分搜索
 * 要求数组必须能进行排序
 * binarySearch([ 5, 3, 1, 2, 6 ], 2)
 * binarySearch([ { age: 2 }, { age: 7 } ], { age: 2 }, (a, b) => a.age - b.age)
 */
function binarySearch (array, value, compareFn = defaultCompare) {
  const { length } = array
  if (length <= 0) return false
  if (length === 1) {
    if (compareFn(array[0], value) === 0) return 0
    return -1
  }
  const arr = sort.quickSort(array.map((value, index) => ({ value, index })), (a, b) => compareFn(a.value, b.value))
  let leftIndex = 0
  let rightIndex = length - 1
  while (leftIndex <= rightIndex) {
    let midIndex = Math.floor((rightIndex + leftIndex) / 2)
    const current = arr[midIndex]
    const compare = compareFn(value, current.value)
    if (compare === 0) {
      return current.index
    } else if (compare < 0) {
      if (midIndex === leftIndex) return -1
      rightIndex = midIndex - 1
    } else if (compare > 0) {
      if (midIndex === rightIndex) return -1
      leftIndex = midIndex + 1
    }
  }
}

/**
 * 内插搜索
 * 要求数组必须能进行排序
 * TODO
 */
function interpolationSearch (array, value) {

}

const search = {
  sequentialSearch,
  binarySearch,
  interpolationSearch
}

export default search