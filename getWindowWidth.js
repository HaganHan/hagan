/**
 * 得到window总宽度
 * hagan.getWindowWidth()
 * !IE8
 */

import resize from './resize'

let getWindowWidth = function () {
  let windowWidth
  resize(() => {
    windowWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)
    getWindowWidth = function () { // 惰性载入函数
      return windowWidth
    }
  }, true)
  return windowWidth
}

export default getWindowWidth