/**
 * 得到img.onload的尺寸信息
 * getImgSizeFromLoad(ev)
 */

const getImgSizeFromLoad = function (eventLoad) {

  const width = eventLoad.target.width || eventLoad.path[0].width
  const height = eventLoad.target.height || eventLoad.path[0].height
  const scale = Math.round((width / height) * 100) / 100

  return { width, height, scale }
}

export default getImgSizeFromLoad