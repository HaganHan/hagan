/**
 * 获取系统名称
 */

let getOs = function () {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) {
    getOs = function () { // 惰性载入函数
      return 'ios'
    }
    return 'ios'
  } else if (/android/.test(userAgent)) {
    getOs = function () { // 惰性载入函数
      return 'android'
    }
    return 'android'
  } else {
    getOs = function () { // 惰性载入函数
      return 'pc'
    }
    return 'pc'
  }
}

export default getOs