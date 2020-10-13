/**
 * 得到cookie
 * getCookie(["username"],["password","wx"])
 * !IE8
 */

const getCookie = function (name) {
  const allCookie = document.cookie.split("; ")
  const cookieParse = {}
  allCookie.forEach(item => {
    const [key, value] = item.split('=')
    try {
      cookieParse[key] = JSON.parse(decodeURIComponent(value))
    } catch (err) {
      cookieParse[key] = decodeURIComponent(value)
    }
  })
  if (name) return cookieParse[name]
  return cookieParse
}
  

export default getCookie