/**
 * //主动触发对象的事件函数  hagan.fnFireEventFn(eBtn,"fnTest")
 * !IE10
 */
import _rely from './_rely'

const triggerEventFunction = function (eventId, eventObject) {
  const { _eventElement, _eventFunction } = _rely._eventPool[eventId]
  _eventFunction.call(_eventElement, eventObject)
}

export default triggerEventFunction