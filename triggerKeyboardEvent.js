/**
 * 主动触发元素的键盘事件
 * hagan.triggerKeyboardEvent(eBtn, "click", {"keyCode":13})
 * Firefox
 */

const triggerKeyboardEvent = function (
  eventElement,
  eventName,
  { keyboardAlt = false, keyboardCtrl = false, keyboardShift = false, keyCode = 0 }
) {
  const event = document.createEvent("Events")
  event.initEvent(eventName, true, true)
  event.view = document.defaultView
  event.altKey = keyboardAlt
  event.ctrlKey = keyboardCtrl
  event.shiftKey = keyboardShift
  event.metaKey = false
  event.keyCode = keyCode
  event.charCode = keyCode
  eventElement.dispatchEvent(event)
}
export default triggerKeyboardEvent