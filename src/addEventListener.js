/**
 * 绑定对象的事件函数
 * hagan.addEventListener(eBtn,"click",function fnAlert1(){})
 * !IE10
 */
import _rely from './_rely.js'
import getEventName from './getEventName.js'
import addTapEventListener from './addTapEventListener.js'

const addEventListener = function (eventElement, eventName, eventFunction, eventCapture = false) {
  const _eventId = Symbol('_eventId')
  const _eventElement = eventElement
  const _eventName = getEventName(eventName)
  const _eventFunction = eventFunction
  const _eventCapture = eventCapture
  _rely._eventPool[_eventId] = {  _eventElement, _eventName, _eventFunction, _eventCapture }

  if (_eventElement.nodeType === 1 || _eventElement === window) {
    if (_eventName === "tap") {
      addTapEventListener(_eventId)
    } else {
      _eventElement.addEventListener(_eventName, _eventFunction, _eventCapture)
    }
  }
  return _eventId
}

export default addEventListener