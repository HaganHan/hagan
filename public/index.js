import hagan from '../src/hagan'
const set1 = new hagan.Collection()
set1.add('a')
set1.add('b')
set1.add('c')
set1.add('d')
set1.add('e')
set1.add('f')
console.log('set1: ', set1)

const set2 = new hagan.Collection()
set2.add('e')
set2.add('f')
set2.add('g')
console.log('set2: ', set2)

/**
 * 集合的并集
 */
const unionSet = set1.union(set2)
console.log('unionSet: ', unionSet)

/**
 * 集合的交集
 */
const intersectionSet = set1.intersection(set2)
console.log('intersectionSet: ', intersectionSet)

/**
 * 集合的差集
 */
const differenceSet = set1.difference(set2)
console.log('differenceSet: ', differenceSet)

/**
 * 子集
 */
const set3 = new hagan.Collection()
set3.add('a')
set3.add('b')
set3.add('c')
const set4 = new hagan.Collection()
set4.add('a')
set4.add('b')
set4.add('c')
set4.add('d')
console.log('set3是set4的子集: ', set3.isSubsetOf(set4))