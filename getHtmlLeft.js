/**
 * 得到元素至html最左边的距离
 * hagan.getHtmlLeft(eDiv)
 * !IE8
 */

 const getHtmlLeft = function (eventElement) {
  let [result, domPositionPar] = [0, eventElement]
  while (domPositionPar) {
    result += domPositionPar.offsetLeft
    domPositionPar = domPositionPar.offsetParent
  }
  return result
}

export default getHtmlLeft