/**
 * 根据js获取的dom px单位得到vw单位
 */
import getHtmlWidth from './getHtmlWidth'

const getRemFromDomPx = function (domPx) {
  const windowWidth = getHtmlWidth()
  return domPx / windowWidth * 100
}

export default getRemFromDomPx