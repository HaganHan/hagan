/**
 * 加减乘除
 */

// 判断number是否为一个整数
function isInteger (number) {
  return Math.floor(number) === number
}

// 将一个浮点数转成整数，返回整数和倍数
function toInteger (floatNumber) {
  const numberInfo = { times: 1, number: 0 }
  const isNegative = floatNumber < 0
  if (isInteger(floatNumber)) {
    numberInfo.number = floatNumber
    return numberInfo
  }
  const stringFloatNumber = String(floatNumber)
  const dotPosition = stringFloatNumber.indexOf('.')
  const length = stringFloatNumber.substr(dotPosition + 1).length
  numberInfo.times = Math.pow(10, length)
  numberInfo.number = toFixed(Math.abs(floatNumber) * numberInfo.times)
  if (isNegative) numberInfo.number = -numberInfo.number
  return numberInfo
}

// 四舍五入
export function toFixed (number, decimalLength = 0) {
  var times = Math.pow(10, decimalLength)
  var fixed = number * times + 0.5
  return parseInt(fixed) / times
}

// 加
export function add (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toInteger(number1)
  const { number: num2, times: times2 } = toInteger(number2)
  const maxTimes = Math.max(times1, times2)
  let result
  if (times1 === times2) result = (num1 + num2) / maxTimes
  if (times1 > times2) result = (num1 + num2 * (times1 / times2)) / maxTimes
  if (times1 < times2) result = (num1 * (times2 / times1) + num2) / maxTimes
  return toFixed(result, decimalLength)
}

// 减
export function subtract (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toInteger(number1)
  const { number: num2, times: times2 } = toInteger(number2)
  const maxTimes = Math.max(times1, times2)
  let result
  if (times1 === times2) result = (num1 - num2) / maxTimes
  if (times1 > times2) result = (num1 - num2 * (times1 / times2)) / maxTimes
  if (times1 < times2) result = (num1 * (times2 / times1) - num2) / maxTimes
  return toFixed(result, decimalLength)
}

// 乘
export function multiply (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toInteger(number1)
  const { number: num2, times: times2 } = toInteger(number2)
  const result = (num1 * num2) / (times1 * times2)
  return toFixed(result, decimalLength)
}

// 除
export function divide (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toInteger(number1)
  const { number: num2, times: times2 } = toInteger(number2)
  const result = (num1 / num2) * (times2 / times1)
  return toFixed(result, decimalLength)
}

export default { add, subtract, multiply, divide, toFixed }