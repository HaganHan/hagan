import hagan from '../src/hagan'
const linkedList = new hagan.LinkedList()
linkedList.push('a')
linkedList.push('b')
linkedList.push('c')
console.log(linkedList.remove('a'))
console.log(linkedList)