/**
 * 二叉搜索树
 */

class Node {
  constructor (key) {
    this.key = key
    this.left = null
    this.right = null
  }
}
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

function compareFn (a, b) {
  if (a === b) return 0
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class BinarySearchTree {
  constructor () {
    this._root = null
  }
  insertNode (node, key) { // TODO
    if (compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left instanceof Node) {
        this.insertNode(node.left, key)
        return
      }
      node.left = new Node(key)
      return
    }
    if (node.right instanceof Node) {
      this.insertNode(node.right, key)
      return
    }
    node.right = new Node(key)
    return
  }
  insert (key) {
    if (this._root instanceof Node) {
      this.insertNode(this._root, key)
    } else {
      this._root = new Node(key)
    }
  }
}