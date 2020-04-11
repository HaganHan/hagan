/**
 * 得到视口宽度
 */
import resize from './resize.js'

let getWindowWidth = function () {
  let windowWidth
  resize(() => {
    windowWidth = document.documentElement.clientWidth || window.innerWidth
    getWindowWidth = function () { // 惰性载入函数
      return windowWidth
    }
  }, true)
  return windowWidth
}

export default getWindowWidth