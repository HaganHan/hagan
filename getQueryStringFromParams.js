/**
 * 根据params得到查询字符串
 */

const getQueryStringFromParams = function (urlOrigin, params) {
  let url = urlOrigin
  if (url.indexOf("?") === -1) {
    url += "?"
  } else {
    url += "&"
  }
  Object.keys(params).forEach(paramKey => {
    url += `${encodeURIComponent(paramKey)}=${encodeURIComponent(params[paramKey])}&`
  })
  return url.substring(0, url.length - 1)
 }

 export default getQueryStringFromParams