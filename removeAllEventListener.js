/**
 * 移除页面上的所有事件处理函数
 */
import _rely from './_rely.js'
import removeEventListener from './removeEventListener.js'

const removeAllEventListener = function () {
  const { _eventPool } = _rely
  console.log('_eventPool: ', _eventPool)
  Object.keys(_eventPool).forEach(eventId => {
    if (_eventPool[eventId] === null) return
    removeEventListener(eventId)
  })
}

export default removeAllEventListener