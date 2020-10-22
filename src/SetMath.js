/**
 * Set类的扩展
 * 增加了并集、交集、差集方法
 */

class SetMath extends Set {
  union (set) {
    return new SetMath([...this, ...set])
  }
  intersection (set) {
    return new SetMath([...this].filter(item => set.has(item)))
  }
  difference (set) {
    return new SetMath([...this].filter(item => !set.has(item)))
  }
}

export default SetMath