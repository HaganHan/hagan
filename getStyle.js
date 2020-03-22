/**
 * 得到计算后的样式
 * hagan.getStyle(eDiv,"width",":after")
 * !IE8
 */

const getStyle = function (eventElement, styleName, pseudoElement = null) {
  return document.defaultView.getComputedStyle(eventElement, pseudoElement)[styleName];
}

export default getStyle