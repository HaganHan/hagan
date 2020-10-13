/**
 * 截取base64
 */

const getBase64String = function (base64) {
  return base64.replace(/(.+\,)(.+)/, ($0, $1, $2) => $2)
}

export default getBase64String