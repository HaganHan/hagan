/**
 * 自平衡二叉搜索树
 * Adelson Velskii Landi Tree
 * 二叉搜索树存在一个问题，就是可能某一边特别深，这样在添加、移除、搜索时会引发一些性能问题，因此自平衡二叉搜索树诞生
 * AVL树是一种自平衡数，添加或移除节点时会尝试保持平衡并尽可能转换成完全树，任何一个节点左右两侧子树的高度之差最多为1
 */
import BinarySearchTree from './BinarySearchTree'

// AdelsonVelskiiLandiTree
class AVLTree extends BinarySearchTree {

}

export default AVLTree