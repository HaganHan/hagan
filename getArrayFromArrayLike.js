/**
 * 类数组转为数组
 */

const getArrayFromArrayLike = function (arrayLike) {
  return [...arrayLike]
}

export default getArrayFromArrayLike