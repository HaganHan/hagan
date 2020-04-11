/**
 * 
 */
import _rely from './_rely.js'
import getStyle from './getStyle.js'
import getInteger from './getInteger.js'
import setInterval from './setInterval.js'
import clearInterval from './clearInterval.js'

const hideDom = function (eventElement, time = 500) {
  return new Promise((resolve, reject) => {
    const datasetHideDomId = eventElement.dataset.hideDomId
    const _hideDomId = datasetHideDomId || _rely._hideDomId++
    if (!_rely[_hideDomId]) _rely[_hideDomId] = {}
    if (!datasetHideDomId) eventElement.dataset.hideDomId = _hideDomId

    const { lock } = _rely[_hideDomId]
    if (lock) return reject('lock is true')
    _rely[_hideDomId].lock = true
    _rely[_hideDomId].opacity = getStyle(eventElement, 'opacity')
    _rely[_hideDomId].display = getStyle(eventElement, 'display')
    eventElement.style.opacity = _rely[_hideDomId].opacity

    const times = getInteger(time / 16) // 过渡多少次
    const item = _rely[_hideDomId].opacity * 1000000 / times / 1000000 // 每次应该减少多少
    hide()
    const timerId = setInterval(hide, time / (times - 1))
    function hide() {
      eventElement.style.opacity -= item
      if (eventElement.style.opacity <= 0) {
        eventElement.style.opacity = 0
        eventElement.style.display = "none"
        _rely[_hideDomId].lock = false
        clearInterval(timerId)
        resolve()
      }
    }
  })
}

export default hideDom