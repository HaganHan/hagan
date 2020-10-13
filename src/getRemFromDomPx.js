/**
 * 根据js获取的dom px单位得到rem单位
 */
import _rely from './_rely'

const getRemFromDomPx = function (domPx) {
  return domPx / _rely._rem
}

export default getRemFromDomPx