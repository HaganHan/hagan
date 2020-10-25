/**
 * 获取对象类型
 * getType('abc') // String
 * !IE8
 */

const getType = function (target) {
  switch (Object.prototype.toString.call(target)) {
    case '[object Symbol]':
      return 'Symbol'
    
    case '[object Number]':
      if (isNaN(target)) return 'NaN'
      if (isFinite(target)) return 'Number'
      return 'Infinity'

    case '[object String]':
      return 'String'

    case '[object Null]':
      return 'Null'

    case '[object Undefined]':
      return 'Undefined'

    case '[object Boolean]':
      return 'Boolean'

    case '[object Function]':
      return 'Function'

    case '[object Date]':
      return 'Date'

    case '[object Array]':
      return 'Array'

    case '[object RegExp]':
      return 'RegExp'

    case '[object BigInt]':
      return 'BigInt'

    case '[object Object]':
      try {
        return target.constructor.name || 'Object'
      } catch (err) {
        return 'Object'
      }

    default:
      return 'Unknown'
  }
}

export default getType