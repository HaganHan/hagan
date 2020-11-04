/**
 * 自平衡二叉搜索树
 * Adelson Velskii Landi Tree
 * 二叉搜索树存在一个问题，就是可能某一边特别深，这样在添加、移除、搜索时会引发一些性能问题，因此自平衡二叉搜索树诞生
 * AVL树是一种自平衡数，添加或移除节点时会尝试保持平衡并尽可能转换成完全树，任何一个节点左右两侧子树的高度之差最多为1
 * 节点的高度: 从当前节点到最深子节点的数量
 * 平衡因子: 
 * TODO:没写完
 */
import BinarySearchTree, { Node } from './BinarySearchTree'
import defaultCompare from './defaultCompare'

// AdelsonVelskiiLandiTree
class AVLTree extends BinarySearchTree {
  constructor (compareFn = defaultCompare) {
    super(compareFn)
  }

  /**
   * 获取节点高度
   */
  getNodeHeight (node) {
    if (!(node instanceof Node)) return -1
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }

  /**
   * 在AVL树中，需要对每个节点计算右子树高度(rightHeight) 和左子树高度(leftHeight) 之间的差值(rightHeight - leftHeight)
   * 如果结果不是0 || 1 || -1 则需要平衡该AVL树，这就是平衡因子的概念
   * getBalanceFactor 方法计算一个节点的平衡因子并返回其值
   */
  getBalanceFactor (node) {
    const rightHeight = this.getNodeHeight(node.right)
    const leftHeight = this.getNodeHeight(node.left)
    switch (rightHeight - leftHeight) {
      case -2:
        return 1
      case -1:
        return 2
      case 1:
        return 4
      case 2:
        return 5
      default:
        return 3
    }
  }
  // TODO:AVL旋转
}

export default AVLTree