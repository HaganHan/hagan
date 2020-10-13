/**
 * 主动触发对象的事件
 * hagan.fnFireEvent(eBtn,"test")
 * !IE10
 */
import _rely from './_rely'
import getEventName from './getEventName'

const triggerEvent = function (eventElement, eventName, eventObject) {
  eventName = getEventName(eventName)
  Object.keys(_rely._eventPool).forEach(key => {
    const { _eventElement, _eventName, _eventFunction } = _rely._eventPool[key]
    if (_eventElement === eventElement && _eventName === eventName) {
      if (_eventFunction instanceof Function) {
        _eventFunction.call(_eventElement, eventObject)
      }
    }
  })
}

export default triggerEvent