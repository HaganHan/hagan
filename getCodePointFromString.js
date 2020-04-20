/**
 * 根据字符串获取Unicode码点
 * getCodePointFromString('💩') // 128169
 */

const getCodePointFromString = function (string = '') {
  return string.codePointAt()
}

export default getCodePointFromString