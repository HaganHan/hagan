/**
 * 加减乘除
 */
import toString from './toString'
import { pow } from './bigInt'

// 判断number是否为一个整数
function isInteger (number) {
  return Math.floor(number) === number
}

// 将一个浮点数转成安全整数，返回安全整数和倍数
function toBigInt (floatNumber) {
  floatNumber = Number(floatNumber)
  const isNegative = floatNumber < 0
  if (isInteger(floatNumber)) {
    return { times: BigInt(1), number: BigInt(floatNumber) }
  }
  const stringFloatNumber = String(floatNumber)
  const dotPosition = stringFloatNumber.indexOf('.')
  const length = stringFloatNumber.substr(dotPosition + 1).length
  const times = Math.pow(10, length)
  const number = Math.abs(floatNumber) * times
  if (isNegative) {
    return { times: BigInt(times), number: BigInt(-number) }
  }
  return { times: BigInt(times), number: BigInt(number) }
}

// 四舍五入，传入一个数字返回一个数字
export function toFixed (number, decimalLength = 0) {
  var times = Math.pow(10, decimalLength)
  var fixed = number * times + 0.5
  return parseInt(fixed) / times
}

function breakUpNumber (number) {
  const symbol = number < 0 ? -1n : 1n
  let stringNumber = toString(number)
  if (symbol === -1n) {
    const arr = stringNumber.split('')
    arr.shift()
    stringNumber = arr.join('')
  }
  const stringNumberList = stringNumber.split('.')
  const integer = stringNumberList[0]
  const decimal = stringNumberList[1] || ''
  const times = pow(10, decimal.length)
  return { symbol, integer, decimal, times }
}

/**
 * 加法
 * 将小数乘以一定倍数并转换成安全整数后进行相加后除以倍数并转换成字符串
 */
export function add (...numberList) {
  return numberList.reduce((number1, number2) => {
    let { integer: integer1, decimal: decimal1, symbol: symbol1, times: times1 } = breakUpNumber(number1)
    let { integer: integer2, decimal: decimal2, symbol: symbol2, times: times2 } = breakUpNumber(number2)
    const maxTimes = times1 > times2 ? times1 : times2
    const placeholder1 = integer1 === '0' ? 1n : 0n
    const placeholder2 = integer2 === '0' ? 1n : 0n
    Array(toString(maxTimes).length - 1 - decimal1.length).fill().forEach(() => decimal1 += '0')
    Array(toString(maxTimes).length - 1 - decimal2.length).fill().forEach(() => decimal2 += '0')
    const bigInt = symbol1 * ((BigInt(integer1) || 1n) * maxTimes + BigInt(decimal1)) + symbol2 * ((BigInt(integer2) || 1n) * maxTimes + BigInt(decimal2))
    const isNegative = bigInt < 0

    const stringBigInt = toString(isNegative ? -1n * bigInt : bigInt)
    const arrayResult = [...stringBigInt]
    arrayResult[0] =  BigInt(arrayResult[0]) - placeholder1 - placeholder2
    const pointIndex = toString(maxTimes).length - 1
    if (pointIndex === 0) return isNegative ? `-${stringBigInt}` : stringBigInt

    const integerStringList = arrayResult.slice(0, -pointIndex)
    const decimalBigInt = BigInt(arrayResult.slice(-pointIndex).join(''))
    let resultArray = []
    if (decimalBigInt === 0n) {
      resultArray = [...integerStringList]
    } else {
      resultArray = [...integerStringList, '.', arrayResult.slice(-pointIndex).join('')]
    }

    if (resultArray[0] === '.') resultArray.unshift('0')
    if (isNegative) resultArray.unshift('-')
    return resultArray.join('')
  })
  
}

// 减
export function subtract (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toBigInt(number1)
  const { number: num2, times: times2 } = toBigInt(number2)
  const maxTimes = Math.max(times1, times2)
  let result
  if (times1 === times2) result = (num1 - num2) / maxTimes
  if (times1 > times2) result = (num1 - num2 * (times1 / times2)) / maxTimes
  if (times1 < times2) result = (num1 * (times2 / times1) - num2) / maxTimes
  return toFixed(result, decimalLength)
}

// 乘
export function multiply (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toBigInt(number1)
  const { number: num2, times: times2 } = toBigInt(number2)
  const result = (num1 * num2) / (times1 * times2)
  return toFixed(result, decimalLength)
}

// 除
export function divide (number1, number2, decimalLength = 0) {
  const { number: num1, times: times1 } = toBigInt(number1)
  const { number: num2, times: times2 } = toBigInt(number2)
  const result = (num1 / num2) * (times2 / times1)
  return toFixed(result, decimalLength)
}

export default { add, subtract, multiply, divide, toFixed }