/**
 * 浅拷贝
 */

const getDeepCloneObject = function (object) {
  return Object.assign({}, object)
}

export default getDeepCloneObject