import hagan from '../src/hagan'

const tree = new hagan.BinarySearchTree()

tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

console.group('中序遍历: ')
tree.inOrderTraverse(key => {
  console.log(key)
})
console.groupEnd('中序遍历: ')

console.group('先序遍历: ')
tree.preOrderTraverse(key => {
  console.log(key)
})
console.groupEnd('先序遍历: ')

console.group('后序遍历: ')
tree.postOrderTraverse(key => {
  console.log(key)
})
console.groupEnd('后序遍历: ')

tree.remove(3)
tree.remove(25)
tree.remove(11)
console.log('获取最小值: ', tree.getMin())
console.log('获取最大值: ', tree.getMax())

console.log('has: ', tree.has(11))
console.log('tree: ', tree)

const treeRemove = new hagan.BinarySearchTree()
treeRemove.insert(11)
treeRemove.insert(9)
treeRemove.insert(7)
treeRemove.remove(9)
console.log('11,9,7移除9: ', treeRemove)
