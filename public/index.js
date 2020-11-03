import hagan from '../src/hagan'

const minHeap = new hagan.MinHeap()
minHeap.insert(2)
minHeap.insert(3)
minHeap.insert(4)
minHeap.insert(5)
minHeap.insert(1)

console.log(minHeap.extract())
console.log(minHeap)

