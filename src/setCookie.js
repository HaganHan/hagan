/**
 * 设置cookie
 * setCookie({'username':'303738305','password':{'qq':'123456','wx':'213424'}})
 * !IE8
 */
import getType from './getType.js'

const setCookie = function (options, timeoutDay = 0) {
  let date
  let del
  if (timeoutDay > 0) {
    date = new Date()
    date.setDate(date.getDate() + timeoutDay)
  } else if (timeoutDay === 0) {
    date = 0
  } else if (timeoutDay < 0) {
    date = timeoutDay
    del = '已过期'
  }

  Object.keys(options).forEach(key => {
    const value = options[key]
    let cookie = ''
    if (getType(value) === 'String') {
      cookie = value
    } else {
      cookie = JSON.stringify(value)
    }
    document.cookie = `${encodeURIComponent(key)}=${del || encodeURIComponent(cookie)}; expires=${date}`
  })
}

export default setCookie