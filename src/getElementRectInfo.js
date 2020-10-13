/**
 * 得到元素位置尺寸信息  hagan.getElementSizeInfo(eDiv1)  !IE8
 */
import resize from './resize.js'
import getWindowWidth from './getWindowWidth.js'
import getWindowHeight from './getWindowHeight.js'
import getHtmlWidth from './getHtmlWidth.js'
import getHtmlHeight from './getHtmlHeight.js'

// 得到元素至html最左边的距离
const getHtmlLeft = function (eventElement) {
  let [result, domPositionPar] = [0, eventElement]
  while (domPositionPar) {
    result += domPositionPar.offsetLeft
    domPositionPar = domPositionPar.offsetParent
  }
  return result
}

// 得到元素至html顶部的距离
const getHtmlTop = function (eventElement) {
  let [result, domPositionPar] = [0, eventElement]
  while (domPositionPar) {
    result += domPositionPar.offsetTop
    domPositionPar = domPositionPar.offsetParent
  }
  return result
}

let getElementRectInfo = function (eventElement) {
  let result
  resize(() => {
    // const boundingClientRect = eventElement.getBoundingClientRect()
    // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    // return {
    //   "pageX": boundingClientRect.left + scrollLeft,
    //   "pageY": boundingClientRect.top + scrollTop,
    //   "width": boundingClientRect.width,
    //   "height": boundingClientRect.height
    // }
    let toHtmlTop = 0
    let toHtmlLeft = 0
    let width = 0
    let height = 0
    let scrollTop = 0
    let scrollLeft = 0
    let toWindowTop = 0
    let toWindowLeft = 0

    if (eventElement === window) {
      width = getWindowWidth()
      height = getWindowHeight()
    } else if (eventElement === document.querySelector('html')) {
      width = getHtmlWidth()
      height = getHtmlHeight()
    } else if (eventElement.nodeType === 1) {
      toHtmlTop = eventElement.clientTop || eventElement.offsetTop || getHtmlTop(eventElement)
      toHtmlLeft = eventElement.clientLeft || eventElement.offsetLeft || getHtmlLeft(eventElement)
      width = eventElement.clientWidth || eventElement.offsetWidth
      height = eventElement.clientHeight || eventElement.offsetHeight
      scrollTop = document.documentElement.scrollTop
      scrollLeft = document.documentElement.scrollLeft
      toWindowTop = toHtmlTop - scrollTop
      toWindowLeft = toHtmlLeft - scrollLeft
    }
    result = {
      width,
      height,
      toHtmlTop,
      toHtmlLeft,
      toWindowTop,
      toWindowLeft
    }
  }, true)
  return result
}

export default getElementRectInfo