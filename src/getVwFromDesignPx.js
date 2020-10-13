/**
 * 根据设计图px单位得到vw单位
 */

const getVwFromDesignPx = function (designPx, designTotalPxWidth = 750) {
  return designPx / designTotalPxWidth * 100
}

export default getVwFromDesignPx