/**
 * 得到整数
 */
import getType from './getType.js'

const getInteger = function (number) {
  if (getType(number) === "Number") {
    return Math[number < 0 ? "ceil" : "floor"](number)
  }
}

export default getInteger