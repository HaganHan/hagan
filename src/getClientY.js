/**
 * 统一移动端与pc端获取鼠标和手指位置方法
 */

const getClientY = function (ev) {
  return ev.clientY || ev.changedTouches[0].clientY
}

export default getClientY