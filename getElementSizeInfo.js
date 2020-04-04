/**
 * 得到元素位置尺寸信息  hagan.getElementSizeInfo(eDiv1)  !IE8
 */

const getElementSizeInfo = function (eventElement) {
  const boundingClientRect = eventElement.getBoundingClientRect()
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
  return {
    "pageX": boundingClientRect.left + scrollLeft,
    "pageY": boundingClientRect.top + scrollTop,
    "width": boundingClientRect.width,
    "height": boundingClientRect.height
  }
}

export default getElementSizeInfo