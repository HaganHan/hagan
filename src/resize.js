/**
 * 模拟窗口大小改变事件且优化性能
 * hagan.resize(function(){})
 * !IE8
 */

const resize = function (resizeFunction, initRun = false) {
  if (initRun) resizeFunction()
  let timer = null
  window.addEventListener("resize", () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      resizeFunction()
    }, 500)
  }, false)
}

export default resize