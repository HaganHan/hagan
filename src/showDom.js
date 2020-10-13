/**
 * 
 */
import _rely from './_rely.js'
import getStyle from './getStyle.js'
import setInterval from './setInterval.js'
import clearInterval from './clearInterval.js'
import { add, subtract, multiply, divide } from './math.js'

const showDom = function (eventElement, time = 500) {
  return new Promise((resolve, reject) => {
    const _hideDomId = eventElement._hideDomId
    if (!_rely._hideDom[_hideDomId]) return reject('eventElement._hideDomId is not defined')

    const { lock } = _rely._hideDom[_hideDomId]
    if (lock) return reject('lock is true')
    _rely._hideDom[_hideDomId].lock = true

    eventElement.style.display = _rely._hideDom[_hideDomId].display

    const times = divide(time, 16) // 过渡多少次
    const item = divide(_rely._hideDom[_hideDomId].opacity, times, 8) // 每次应该增加多少
    const _timerId = setInterval(show, 16)
    show()
    function show() {
      const opacity = getStyle(eventElement, 'opacity')
      eventElement.style.opacity = add(opacity, item, 8)
      if (eventElement.style.opacity >= 1) {
        eventElement.style.opacity = 1
        _rely._hideDom[_hideDomId].lock = false
        clearInterval(_timerId)
        resolve()
      }
    }
  })
}

export default showDom