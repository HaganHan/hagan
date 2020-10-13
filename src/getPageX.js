/**
 * 得到鼠标或手指到页面顶部或左部的距离
 */

const getPageX = function (ev) {
  return ev.pageX || ev.changedTouches[0].pageX
}

export default getPageX