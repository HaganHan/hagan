/**
 * 解除对象的事件函数绑定
 * hagan.removeEventListener(eBtn,"click","fnAlert1")
 * !IE10
 */
import _rely from './_rely.js'
 
function removeEventListener (eventId) {
  if (!_rely._eventPool[eventId]) return
  const { _eventElement, _eventName, _eventFunction, _eventCapture } = _rely._eventPool[eventId]
  if (_eventName === "tap") {
    if (_rely._tapEventPool[eventId]) {
      const { _eventElement, _eventName, _eventFunction, _eventCapture } = _rely._tapEventPool[eventId]
      _eventElement.removeEventListener(_eventName, _eventFunction, _eventCapture)
      _rely._tapEventPool[eventId] = null
    }
  } else {
    _eventElement.removeEventListener(_eventName, _eventFunction, _eventCapture)
  }
  _rely._eventPool[eventId] = null
}

export default removeEventListener