/**
 * 将base64图片转换为Blob
 */
import getBase64String from './getBase64String.js'

const getBlobFromBase64 = function (base64) {

  let bytes
  try { // 去掉url的头，并转换为byte
    bytes = window.atob(base64)
  } catch (err) {
    const base64String = getBase64String(base64)
    bytes = window.atob(base64String)
  }
  console.log('bytes: ', Object.keys(bytes))

  // 处理异常,将ascii码小于0的转换为大于0
  const arrayBuffer = new ArrayBuffer(bytes.length)
  const uint8Array = new Uint8Array(arrayBuffer)
  Object.keys(bytes).forEach(key => {
    uint8Array[key] = bytes.charCodeAt(key)
  })
  return new Blob([arrayBuffer], { type: 'image/png' });
}

export default getBlobFromBase64