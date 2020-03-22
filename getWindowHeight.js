/**
 * 得到window总宽度
 * hagan.getWindowWidth()
 * !IE8
 */

import resize from './resize'

let getWindowHeight = function () {
  let windowHeight
  resize(() => {
    windowHeight =  Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
    getWindowHeight = function () { // 惰性载入函数
      return windowHeight
    }
  }, true)
  return windowHeight
}

export default getWindowHeight