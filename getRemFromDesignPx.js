/**
 * 根据设计图px单位得到rem单位
 */

const getRemFromDesignPx = function (designPx, designTotalPxWidth = 750) {
  return 10 * designPx / designTotalPxWidth;
}

export default getRemFromDesignPx