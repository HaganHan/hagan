/**
 * 主动触发元素的鼠标事件
 * hagan.triggerMouseEvent(domDiv1, 'click', { clientX: 280, clientY: 280 })
 */
import _rely from './_rely'
import getEventName from './getEventName'

const triggerMouseEvent = function (eventElement, eventName, eventObject) {
  eventName = getEventName(eventName)
  const mouseEvent = new MouseEvent(eventName, eventObject)
  eventElement.dispatchEvent(mouseEvent)
}

export default triggerMouseEvent