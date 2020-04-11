/**
 * 统一移动端与pc端获取鼠标和手指位置方法
 */

const getClientX = function (ev) {
  return ev.clientX || ev.changedTouches[0].clientX
}

export default getClientX