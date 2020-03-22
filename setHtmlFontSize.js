/**
 * 动态设置html根节点的字体大小
 * hagan.setHtmlFontSize()
 * !IE8
 */
import _rely from './_rely'
import resize from './resize'
import getWindowWidth from './getWindowWidth'

const setHtmlFontSize = function () {
  const domHtml = document.querySelector("html")
  const domBody = document.querySelector("body")
  let bodyWidth

  resize(() => {
    bodyWidth = getWindowWidth()
    _rely._rem = bodyWidth / 10
    domHtml.style.fontSize = `${_rely._rem}px`
    domBody.style.fontSize = `0.4rem`
  }, true)
}

export default setHtmlFontSize