/**
 * 得到body宽度
 * hagan.getBodyWidth()
 * !IE8
 */
import resize from './resize'

let getBodyWidth = function () {
  let bodyWidth
  resize(() => {
    bodyWidth = document.body.clientWidth
    getBodyWidth = function () { // 惰性载入函数
      return bodyWidth
    }
  }, true)
  return bodyWidth
}

export default getBodyWidth