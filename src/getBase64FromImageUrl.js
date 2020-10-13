/**
 * 
 * 闭包:返回对应图片的base64
 * !IE10
 * const jBase64=hagan.fnGetImageBase64("backImage.jpg");
 * jBase64["oImage"].onload=()=>{const sBase64=jBase64["fnOnLoad"]()["str"]};
 */

const getBase64FromImageUrl = function (imageUrl) {//调用该方法返回一个以传入链接创建的一个图片标签和该图片标签的onload事件组成的json
  return new Promise((resolve, reject) => {
    const domImage = document.createElement("img")
    domImage.crossOrigin = "Anonymous"
    domImage.style.verticalAlign = "middle"
    domImage.onload = () => { // 调用该方法返回base64的原始数据和经过处理的str数据组成的json
      const domCanvas = document.createElement("canvas")
      domCanvas.width = domImage.width
      domCanvas.height = domImage.height
      const context = domCanvas.getContext("2d")
      context.drawImage(domImage, 0, 0, domImage.width, domImage.height)
      const suffix = domImage.src.substring(domImage.src.lastIndexOf(".") + 1).toLowerCase()
      const base64 = domCanvas.toDataURL(`image/${suffix}`)
      resolve(base64)
    }
    domImage.src = imageUrl
  })
}

export default getBase64FromImageUrl
