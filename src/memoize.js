/**
 * 缓存递归函数前一个计算结果供后续使用
 */

const memoize = function (fnRecursion, oObj = {}) {
  return function (opt) {
    if (!oObj.hasOwnProperty(opt)) {
      oObj[opt] = fnRecursion(opt);
    }
    return oObj[opt];
  }
}

export default memoize