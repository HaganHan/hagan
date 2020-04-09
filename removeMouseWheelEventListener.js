/**
 * 移除元素滚轮事件
 * hagan.removeMouseWheelEventListener(window,"fn")
 * !IE8
 */
import _rely from './_rely.js'

const removeMouseWheelEventListener = function (mouseWheelId) {
  if (!_rely._mouseWheel[mouseWheelId]) return
  const { _eventElement, _eventFunction, _eventCapture } = _rely._mouseWheel[mouseWheelId]
  _eventElement.removeEventListener("mousewheel", _eventFunction, _eventCapture)
  _eventElement.removeEventListener("DOMMouseScroll", _eventFunction, _eventCapture)
}

export default removeMouseWheelEventListener