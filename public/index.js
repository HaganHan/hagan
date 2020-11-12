import hagan from '../src/hagan'

const array = [5, 7, 3, 9, 1, 6, 2, 8, 4, 0]

console.time('冒泡排序')
console.log('冒泡排序: ', hagan.sort.bubbleSort(array)) // 对比了45次
console.timeEnd('冒泡排序')

console.time('选择排序')
console.log('选择排序: ', hagan.sort.selectionSort(array)) // 对比了54次
console.timeEnd('选择排序')

console.time('插入排序')
console.log('插入排序: ', hagan.sort.insertionSort(array)) // 对比了34次
console.timeEnd('插入排序')

console.time('归并排序')
console.log('归并排序: ', hagan.sort.mergeSort(array)) // 对比了25次
console.timeEnd('归并排序')

console.time('快速排序')
console.log('快速排序: ', hagan.sort.quickSort(array)) // 对比了19次
console.timeEnd('快速排序')

console.time('计数排序')
console.log('计数排序: ', hagan.sort.countionSort(array))
console.timeEnd('计数排序')

console.time('桶排序')
console.log('桶排序: ', hagan.sort.bucketSort(array))
console.timeEnd('桶排序')
