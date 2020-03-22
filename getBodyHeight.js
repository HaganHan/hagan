/**
 * 得到body高度
 * hagan.fnGetHtmlHeight()
 * !IE8
 */
import resize from './resize'

let getBodyHeight = function () {
  let bodyHeight
  resize(function () {
    bodyHeight = document.body.clientHeight
    getBodyHeight = function () {
      return bodyHeight
    }
  }, true)
  return bodyHeight
}

export default getBodyHeight