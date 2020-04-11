/**
 * 得到文档总宽度
 * hagan.getDocumentWidth()
 * !IE8
 */
import resize from './resize.js'

let getDocumentHeight = function () {
  let documentHeight
  resize(() => {
    documentHeight =  Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
    getDocumentHeight = function () { // 惰性载入函数
      return documentHeight
    }
  }, true)
  return documentHeight
}

export default getDocumentHeight