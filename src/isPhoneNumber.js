/**
 * 判断是否是手机号
 */

const isPhoneNumber = function (number) {
  const regex = /^1\d{10}$/
  return regex.test(number)
}

export default isPhoneNumber