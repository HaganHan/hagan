/**
 * 根据Unicode码点获取字符串
 * getStringFromCodePoint(128169) // 💩
 */

const getStringFromCodePoint = function (codePoint = 0) {
  return String.fromCodePoint(codePoint)
}

export default getStringFromCodePoint