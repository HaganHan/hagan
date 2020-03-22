/**
 * 根据js获取的dom px单位得到vw单位
 */
import getWindowWidth from './getWindowWidth'

const getRemFromDomPx = function (domPx) {
  const windowWidth = getWindowWidth()
  return domPx / windowWidth * 100
}

export default getRemFromDomPx