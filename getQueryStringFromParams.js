/**
 * 根据params得到查询字符串
 */

const getQueryStringFromParams = function (urlOrigin, params) {
  let url = urlOrigin
  const paramsKeys = Object.keys(params)
  if (paramsKeys.length === 0) return url
  if (url.indexOf("?") === -1) {
    url += "?"
  } else {
    url += "&"
  }
  paramsKeys.forEach(paramKey => {
    url += `${encodeURIComponent(paramKey)}=${encodeURIComponent(params[paramKey])}`
  })
  return url
 }

 export default getQueryStringFromParams