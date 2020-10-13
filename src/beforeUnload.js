/**
 * 浏览器关闭事件
 * hagan.beforeUnload("是否关闭？")
 * !IE10
 */

const beforeUnload = function (message, callback = () => {}) {
  const eventFunction = function (ev) {
    callback()
    ev.returnValue = message
    ev.preventDefault()
    return message
  }
  window.removeEventListener("beforeunload", eventFunction)
  window.addEventListener("beforeunload", eventFunction)
}

export default beforeUnload