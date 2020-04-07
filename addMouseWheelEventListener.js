/**
 * 给元素添加滚轮事件
 * hagan.addMouseWheelEventListener(window,function fn(){},function fn(){})
 * !IE8
 */
import _rely from './_rely.js'

const addMouseWheelEventListener = function (eventElement, upCallback, downCallback, eventCapture = false) {
  const mouseWheelId = _rely._mouseWheelId++
  const _eventElement = eventElement
  const _eventFunction = function (ev) {
    ev.wheelDelta ? (ev.wheelDelta > 0 ? upCallback(ev) : downCallback(ev)) : (ev.detail < 0 ? upCallback(ev) : downCallback(ev))
  }
  const _eventCapture = eventCapture
  _rely._mouseWheel[mouseWheelId] = { _eventElement, _eventFunction, _eventCapture }
  _eventElement.addEventListener("mousewheel", _eventFunction, _eventCapture)
  _eventElement.addEventListener("DOMMouseScroll", _eventFunction, _eventCapture)
  return mouseWheelId
}

export default addMouseWheelEventListener