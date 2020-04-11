/**
 * 根据js获取的dom px单位得到vw单位
 */
import getDocumentWidth from './getDocumentWidth'

const getRemFromDomPx = function (domPx) {
  const windowWidth = getDocumentWidth()
  return domPx / windowWidth * 100
}

export default getRemFromDomPx