/**
 * 删除cookie(不能删除子cookie)
 * hagan.delCookie(["username"],["password"])
 * !IE8
 */
import getCookie from './getCookie.js'
import setCookie from './setCookie.js'

const removeCookie = function (name) {
  const allCookie = getCookie()
  Object.keys(allCookie).forEach(key => {
    if (!name || name === key) setCookie({ [key]: '' }, -1)
  })
}

export default removeCookie