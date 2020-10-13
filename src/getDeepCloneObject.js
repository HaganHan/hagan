/**
 * 深拷贝
 */

const getCloneObject = function (object) {
  return JSON.parse(JSON.stringify(object))
}

export default getCloneObject