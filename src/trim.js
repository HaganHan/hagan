/**
 * 移除字符串首尾空格
 */
import getType from './getType.js'

const trim = function (string) {
  if (getType(string) === 'String') {
    return string.replace(/^\s+|\s+$/g, '');
  }
}

export default trim