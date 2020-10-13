/**
 * 
 */
import _rely from './_rely.js'
import getStyle from './getStyle.js'
import setInterval from './setInterval.js'
import clearInterval from './clearInterval.js'
import { add, subtract, multiply, divide } from './math.js'

const hideDom = function (eventElement, time = 500) {
  return new Promise((resolve, reject) => {
    const _hideDomId = eventElement._hideDomId || Symbol('_hideDomId')
    if (!eventElement._hideDomId) {
      _rely._hideDom[_hideDomId] = {
        opacity: getStyle(eventElement, 'opacity'),
        display: getStyle(eventElement, 'display'),
        lock: false
      }
      eventElement._hideDomId = _hideDomId
    }

    const { lock } = _rely._hideDom[_hideDomId]
    if (lock) return reject('lock is true')
    _rely._hideDom[_hideDomId].lock = true

    const times = divide(time, 16) // 过渡多少次
    const item = divide(_rely._hideDom[_hideDomId].opacity, times, 8) // 每次应该减少多少
    const _timerId = setInterval(hide, 16)
    hide()
    function hide() {
      const opacity = getStyle(eventElement, 'opacity')
      eventElement.style.opacity = subtract(opacity, item, 8)
      if (eventElement.style.opacity <= 0) {
        eventElement.style.opacity = 0
        eventElement.style.display = "none"
        _rely._hideDom[_hideDomId].lock = false
        clearInterval(_timerId)
        resolve()
      }
    }
  })
}

export default hideDom