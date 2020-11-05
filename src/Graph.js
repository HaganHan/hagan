/**
 * 图
 * G = (V, E)
 * V: 一组顶点
 * E: 一组边，连接V中的顶点
 * 图是一组由边连接的顶点
 * 相邻顶点: 由一条边连接在一起的顶点
 * 顶点的度: 其相邻顶点的数量
 * 路径: 是顶点V1,V2...Vn的一个连续序列，其中Vn和Vn+1是相邻的
 * 简单路径: 除了最后一个点外不包含重复点的路径
 * 环: 环也是一种简单路径
 * 无环的: 如果图中不存在环，则称该图是无环的
 * 连通的: 如果图中每个顶点间都存在路径，则该图是连通的
 * 有向图: 图可以是有向或无向的，有向图的边有一个方向(箭头)
 * 无向图: 无向图的边为一个直线
 * 强连通: 如果图中每两个顶点间在双向上都存在路径，则该图是强连通的(双向都有箭头)
 * 加权图: 加权图的边被赋予了权值(边上有数字)
 * 未加权图: !加权图
 */

/**
 * 图的表示
 * 1.邻接矩阵
 * 求两个顶点是否相邻时可用该法
 * TODO
 */

/**
 * 图的表示
 * 2.邻接表
 * https://p4.ssl.qhimg.com/t01dbf0aeb51d3de4fa.jpg
 */

class Graph {
  constructor (isDirected = false) { // 是否是有向图
    this._isDirected = isDirected
    // this._vertices = [] // 图中所有顶点的名字
    this._mapAdjacencyList = new Map() // 用字典来储存邻接表，key为顶点名字，value为邻接顶点数组
  }
  addVertex (vertex) {
    if (this._mapAdjacencyList.has(vertex)) return
    // this._vertices.push(vertex)
    this._mapAdjacencyList.set(vertex, [])
  }
  addEdge (vertex1, vertex2) {
    if (!(this._mapAdjacencyList.has(vertex1))) this.addVertex(vertex1)
    if (!(this._mapAdjacencyList.has(vertex2))) this.addVertex(vertex2)
    this._mapAdjacencyList.get(vertex1).push(vertex2)
    if (!this._isDirected) { // 如果是无向图
      this._mapAdjacencyList.get(vertex2).push(vertex1)
    }
  }
  getVertices () {
    return [...this._mapAdjacencyList.keys()]
  }
  getAdjacencyList () {
    return this._mapAdjacencyList
  }
  toString () {
    let result = ''
    this._mapAdjacencyList.forEach((value, key) => {
      result += `${key} => `
      value.forEach(value => {
        result += `${value} `
      })
      result += '\n'
    })
    return result
  }
  // TODO: 广度优先搜索、深度优先搜索、最短路径算法、最小生成树
}

/**
 * 图的表示
 * 3.关联矩阵
 * 通常用于边的数量多于顶点的情况
 * TODO
 */

export default Graph