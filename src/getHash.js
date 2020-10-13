/**
 * 获取哈希值
 * getHash()
 * !IE8
 */

const getHash = function (url) {
  return url.replace(/(.*)(\#)(.+)/, ($0, $1, $2, $3) => $3)
}

export default getHash