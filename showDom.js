/**
 * 
 */
import _rely from './_rely.js'
import getStyle from './getStyle.js'
import getInteger from './getInteger.js'
import setInterval from './setInterval.js'
import clearInterval from './clearInterval.js'

const showDom = function (eventElement, time = 500) {
  return new Promise((resolve, reject) => {
    const _hideDomId = eventElement.dataset.hideDomId
    if (!_rely[_hideDomId]) return reject('eventElement.dataset.hideDomId is not defined')

    const { lock } = _rely[_hideDomId]
    if (lock) return reject('lock is true')
    _rely[_hideDomId].lock = true
    eventElement.style.opacity = 0
    eventElement.style.display = _rely[_hideDomId].display

    const times = getInteger(time / 16) // 过渡多少次
    const item = _rely[_hideDomId].opacity * 100 / times / 100 // 每次应该增加多少
    show()
    const timerId = setInterval(show, time / (times - 1))
    function show() {
      eventElement.style.opacity = Number(eventElement.style.opacity) + item
      if (eventElement.style.opacity >= 1) {
        eventElement.style.opacity = 1
        _rely[_hideDomId].lock = false
        clearInterval(timerId)
        resolve()
      }
    }
  })
}

export default showDom