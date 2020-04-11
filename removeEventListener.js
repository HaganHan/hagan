/**
 * 解除对象的事件函数绑定
 * hagan.removeEventListener(eBtn,"click","fnAlert1")
 * !IE10
 */
import _rely from './_rely.js'
 
function removeEventListener (_eventId) {
  if (!_rely._eventPool[_eventId]) return
  const { _eventElement, _eventName, _eventFunction, _eventCapture } = _rely._eventPool[_eventId]
  if (_eventName === "tap") {
    if (_rely._tapEventPool[_eventId]) {
      const { _eventElement, _eventName, _eventFunction, _eventCapture } = _rely._tapEventPool[_eventId]
      _eventElement.removeEventListener(_eventName, _eventFunction, _eventCapture)
      _rely._tapEventPool[_eventId] = null
    }
  } else {
    _eventElement.removeEventListener(_eventName, _eventFunction, _eventCapture)
  }
  _rely._eventPool[_eventId] = null
}

export default removeEventListener