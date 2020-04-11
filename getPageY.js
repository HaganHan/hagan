/**
 * 得到鼠标或手指到页面顶部或左部的距离
 */

const getPageY = function (ev) {
  return ev.pageY || ev.changedTouches[0].pageY
}

export default getPageY