/**
 * 委托元素的事件函数绑定
 * hagan.addEntrustEventListener(document.body,"click",{"btn1":function(){},"btn2":function(){}}
 * !IE10
 */
import addEventListener from './addEventListener'

const addEntrustEventListener = function (eventElement, eventName, optionEventFunction, eventCapture = false) {
  const eventId = addEventListener(eventElement, eventName, function (ev) {
    let targetId = ''
    try {
      targetId = ev.srcElement.id
    } catch (err) {
      targetId = ev.originalTarget.id
    }
    Object.keys(optionEventFunction).forEach(id => {
      if (id === targetId) {
        optionEventFunction[id]()
      }
    })
  }, eventCapture)
  return eventId
}

export default addEntrustEventListener