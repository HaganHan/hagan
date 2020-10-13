/**
 * 根据当前设备类型返回对应事件名称
 */
import getOs from './getOs.js'

const getEventName = function (eventName) {
  const os = getOs()
  if (os === 'pc') {
    switch (eventName) {
      case "touchstart":
        return "mousedown";
      case "touchmove":
        return "mousemove";
      case "touchend":
        return "mouseup";
      case "tap":
        return "click";
      default:
        return eventName;
    }
  }
  if (os === 'android' || os === 'ios') {
    switch (eventName) {
      case "mousedown":
        return "touchstart";
      case "mousemove":
        return "touchmove";
      case "mouseup":
        return "touchend";
      case "click":
        return "tap";
      default:
        return eventName;
    }
  }
}

export default getEventName