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

function defaultCompare (a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}

class BinarySearchTree {
  constructor (compareFn = defaultCompare) {
    this.compareFn = compareFn
    this._root = null
  }
  insert (key) {
    if (this._root instanceof Node) {
      return this.insertNode(this._root, key)
    } else {
      this._root = new Node(key)
      return true
    }
  }
  insertNode (node, key) {
    const compare = this.compareFn(key, node.key)
    if (compare === 0) return false
    if (compare === -1) {
      if (node.left instanceof Node) {
        this.insertNode(node.left, key)
        return true
      }
      node.left = new Node(key)
      return true
    }

    // compare === 1
    if (node.right instanceof Node) {
      this.insertNode(node.right, key)
      return true
    }
    node.right = new Node(key)
    return true
  }

  /**
   * 中序遍历
   * 从左到右，从小到大遍历
   */
  inOrderTraverse (callback) {
    this.inOrderTraverseNode(this._root, callback)
  }
  inOrderTraverseNode (node, callback) {
    if (!(node instanceof Node)) return
    this.inOrderTraverseNode(node.left, callback)
    callback(node.key)
    this.inOrderTraverseNode(node.right, callback)
  }

  /**
   * 先序遍历
   * 先访问自己，后访问子节点
   */
  preOrderTraverse (callback) {
    this.preOrderTraverseNode(this._root, callback)
  }
  preOrderTraverseNode (node, callback) {
    if (!(node instanceof Node)) return
    callback(node.key)
    this.preOrderTraverseNode(node.left, callback)
    this.preOrderTraverseNode(node.right, callback)
  }

  /**
   * 后序遍历
   * 先访问子节点，后访问自己
   */
  postOrderTraverse (callback) {
    this.postOrderTraverseNode(this._root, callback)
  }
  postOrderTraverseNode (node, callback) {
    if (!(node instanceof Node)) return
    this.postOrderTraverseNode(node.left, callback)
    this.postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }

  /**
   * 获取最小值
   */
  getMin () {
    return this.getMinNode(this._root)
  }
  getMinNode (node) {
    if (!(node.left instanceof Node)) return node.key
    return this.getMinNode(node.left)
  }

  /**
   * 获取最大值
   */
  getMax () {
    return this.getMaxNode(this._root)
  }
  getMaxNode (node) {
    if (!(node.right instanceof Node)) return node.key
    return this.getMaxNode(node.right)
  }

  /**
   * 判断是否存在某值
   */
  has (key) {
    this.hasNode(this._root, key)
  }
  hasNode (node, key) { // TODO
    if (!(node instanceof Node)) return false

  }
}

export default BinarySearchTree