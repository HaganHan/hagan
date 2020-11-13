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

console.time('洗牌算法')
console.log('洗牌算法: ', hagan.random.shuffle(arrObj))
console.timeEnd('洗牌算法')
