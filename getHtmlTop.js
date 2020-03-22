/**
 * 得到元素至html顶部的距离
 * hagan.getHtmlTop(eDiv)
 * !IE8
 */


const getHtmlTop = function (eventElement) {
  let [result, domPositionPar] = [0, eventElement]
  while (domPositionPar) {
    result += domPositionPar.offsetTop
    domPositionPar = domPositionPar.offsetParent
  }
  return result
}

export default getHtmlTop