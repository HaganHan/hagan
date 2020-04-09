/**
 * 移除元素的所有事件处理函数
 * hagan.removeDomElement(eBtn1,true)
 * !IE10
 */
import _rely from './_rely.js'
import removeEventListener from './removeEventListener.js'

const removeDomElement = function (eventElement) {
  const { _eventPool } = _rely

  Object.keys(_eventPool).forEach(eventId => {
    if (_eventPool[eventId] === null) return
    const { _eventElement } = _eventPool[eventId]
    if (_eventElement === eventElement) {
      removeEventListener(eventId)
    }
  })
  eventElement.remove()
}

export default removeDomElement