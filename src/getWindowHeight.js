/**
 * 得到视口高度
 */
import resize from './resize.js'

let getWindowHeight = function () {
  let windowHeight
  resize(() => {
    windowHeight = document.documentElement.clientHeight || window.innerHeight
    getWindowHeight = function () { // 惰性载入函数
      return windowHeight
    }
  }, true)
  return windowHeight
}

export default getWindowHeight