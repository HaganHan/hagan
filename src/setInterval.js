/**
 * 设置自定义定时器
 * hagan.fnSetInterval(function nTimer1(){},1000)
 * !IE10
 * 为了防止后一个调用会在前一个调用结束之前执行, 使用setTimeout模拟setInterval
 */
import _rely from './_rely.js'

const setInterval = function (callback, delay, arg = []) {
  const _timerId = Symbol('_timerId');
  (function loop() {
    if (_rely._timer[_timerId] === null) return
    clearTimeout(_rely._timer[_timerId])
    _rely._timer[_timerId] = setTimeout(() => {
      callback(...arg)
      loop()
    }, delay)
  })()
  return _timerId
}

export default setInterval