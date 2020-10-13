/**
 * 移除页面上的所有事件处理函数
 */
import _rely from './_rely.js'
import removeEventListener from './removeEventListener.js'

const removeAllEventListener = function () {
  const { _eventPool } = _rely
  console.log('_eventPool: ', _eventPool)
  Object.keys(_eventPool).forEach(_eventId => {
    if (_eventPool[_eventId] === null) return
    removeEventListener(_eventId)
  })
}

export default removeAllEventListener