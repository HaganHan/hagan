/**
 * Set类的扩展
 * 增加了并集、交集、差集、子集方法
 */

class SetMath extends Set {
  union (set) { // 并集
    return new SetMath([...this, ...set])
  }
  intersection (set) { // 交集
    return new SetMath([...this].filter(item => set.has(item)))
  }
  difference (set) { // 差集
    return new SetMath([...this].filter(item => !set.has(item)))
  }
  isSubsetOf (set) { // 子集
    return [...this].every(item => set.has(item))
  }
}

export default SetMath