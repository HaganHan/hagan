/**
 * 得到文档总宽度
 * getDocumentWidth()
 * !IE8
 */
import resize from './resize.js'

let getHtmlWidth = function () {
  let documentWidth
  resize(() => {
    documentWidth = Math.max(document.documentElement.scrollWidth, (document.documentElement.clientWidth || window.innerWidth))
    getHtmlWidth = function () { // 惰性载入函数
      return documentWidth
    }
  }, true)
  return documentWidth
}

export default getHtmlWidth