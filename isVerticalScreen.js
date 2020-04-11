/**
 * 判断是否是竖屏
 */
import getWindowWidth from './getWindowWidth.js'
import getWindowHeight from './getWindowHeight.js'

const isVerticalScreen = function () {
  const width = getWindowWidth()
  const height = getWindowHeight()
  return height > width
}

export default isVerticalScreen