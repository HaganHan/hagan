/**
 * 清除自定义定时器
 * hagan.fnSetInterval("nTimer1")
 * !IE10
 */
import _rely from './_rely.js'

const clearInterval = function (_timerId) {
  clearTimeout(_rely._timer[_timerId])
  _rely._timer[_timerId] = null
}

export default clearInterval