import hagan from '../src/hagan'

const array = [5, 7, 3, 9, 1, 6, 2, 8, 4, 0]
const arrObj = [
  { age: 5, name: 'hagan5' },
  { age: 7, name: 'hagan7' },
  { age: 3, name: 'hagan3' },
  { age: 9, name: 'hagan9' },
  { age: 1, name: 'hagan1' },
  { age: 6, name: 'hagan6' },
  { age: 2, name: 'hagan2' },
  { age: 8, name: 'hagan8' },
  { age: 4, name: 'hagan4' },
  { age: 0, name: 'hagan0' },
]

console.time('顺序搜索')
console.log('顺序搜索: ', hagan.search.sequentialSearch(array, 2))
console.log('顺序搜索: ', hagan.search.sequentialSearch(arrObj, { name: 'hagan2' }, (current, item) => current.name === item.name))
console.timeEnd('顺序搜索')

console.time('二分搜索')
console.log('二分搜索: ', hagan.search.binarySearch(array, 2))
console.log('二分搜索: ', hagan.search.binarySearch(arrObj, { age: 2 }, (current, item) => current.age - item.age))
console.log('二分搜索: ', hagan.search.binarySearch(arrObj, { name: 'hagan2' }, (a, b) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
}))
console.timeEnd('二分搜索')
