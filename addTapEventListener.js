/**
 * tap事件封装
 */
import _rely from './_rely.js'

const addTapEventListener = function (_eventId) {
  const { _eventElement, _eventFunction, _eventCapture } = _rely._eventPool[_eventId]
  let moved
  const touchMoveEventFunction = function () {
    moved = false
  }
  const touchEndEventFunction = function (ev) {
    if (moved) _eventFunction.call(_eventElement, ev)
    _eventElement.removeEventListener("touchmove", touchMoveEventFunction, _eventCapture)
    _eventElement.removeEventListener("touchend", touchEndEventFunction, _eventCapture)
  }
  const touchStartEventFunction = function () {
    moved = true
    _eventElement.addEventListener("touchmove", touchMoveEventFunction, _eventCapture)
    _eventElement.addEventListener("touchend", touchEndEventFunction, _eventCapture)

  }
  _eventElement.addEventListener("touchstart", touchStartEventFunction, _eventCapture)
  _rely._tapEventPool[_eventId] = {
    _eventElement,
    _eventName: 'touchstart',
    _eventFunction: touchStartEventFunction,
    _eventCapture
  }
}

export default addTapEventListener