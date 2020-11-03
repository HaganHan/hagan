/**
 * 二叉搜索树(BST)
 */

/**
 * 树
 * 跟节点: 树顶
 * 内部节点: 至少有一个子节点
 * 外部节点(叶节点): 无子节点
 * 子树: 子节点能够独立组成一棵树
 * 深度: 有几个祖先节点
 * 高度: 所有节点深度的最大值
 * 层级: 根节点为0 子节点为1 孙子节点为2 曾孙节点为3
 */

/**
 * 二叉树
 * 二叉树只能有一左一右两个子节点
 */

/**
 * 二叉搜索树(BST)
 * 左子节点小于父节点，右子节点大于父节点
 */


export class Node {
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
    return this.getMinKey(this._root)
  }
  getMinKey (node) {
    if (!(node.left instanceof Node)) return node.key
    return this.getMinKey(node.left)
  }
  getMinNode (node) {
    if (!(node.left instanceof Node)) return node
    return this.getMinNode(node.left)
  }

  /**
   * 获取最大值
   */
  getMax () {
    return this.getMaxKey(this._root)
  }
  getMaxKey (node) {
    if (!(node.right instanceof Node)) return node.key
    return this.getMaxKey(node.right)
  }
  getMaxNode (node) {
    if (!(node.right instanceof Node)) return node
    return this.getMaxNode(node.right)
  }

  /**
   * 判断是否存在某值
   */
  has (key) {
    return this.hasNode(this._root, key)
  }
  hasNode (node, key) {
    if (!(node instanceof Node)) return false
    const compare = this.compareFn(key, node.key)
    if (compare === 0) return true
    if (compare === -1) return this.hasNode(node.left)
    if (compare === 1) return this.hasNode(node.right)
  }

  /**
   * 移除一个节点
   */
  remove (key) {
    this._root = this.removeNode(this._root, key)
  }
  removeNode (node, key) { // 从node树中移除一个节点，返回新的重组后的node树
    if (!(node instanceof Node)) return null

    const compare = this.compareFn(node.key, key)
    if (compare === -1) {
      node.right = this.removeNode(node.right, key)
      return node
    } else if (compare === 1) {
      node.left = this.removeNode(node.left, key)
      return node
    }

    // compare === 0
    const hasLeft = node.left instanceof Node
    const hasRight = node.right instanceof Node
    if (!hasLeft && !hasRight) {
      node = null
      return node
    }
    if (!hasLeft && hasRight) {
      node = node.right
      return node
    }
    if (hasLeft && !hasRight) {
      node = node.left
      return node
    }
    const rightMinNode = this.getMinNode(node.right)
    node.key = rightMinNode.key
    this.removeNode(node.right, rightMinNode.key)
    return node
  }
}

export default BinarySearchTree