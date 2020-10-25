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

/**
 * 传入数字
 * 返回正负号、整数位字符串、小数位字符串，小数位想转换成整数位所需要的倍数
 * symbol: BigInt
 * integer: string
 * decimal: string
 * times: BigInt
 */
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
 * 此方法能够安全的计算所有数字的加法，包括小数和最大安全整数外的数字运算
 */
export function add (...numberList) {
  return numberList.reduce((number1, number2) => {
    let { integer: integer1, decimal: decimal1, symbol: symbol1, times: times1 } = breakUpNumber(number1)
    let { integer: integer2, decimal: decimal2, symbol: symbol2, times: times2 } = breakUpNumber(number2)
    // 两个数想都转换成整数进行运算必须要找到俩个中倍数最大的进行想法运算
    const maxTimes = times1 > times2 ? times1 : times2
    // 如果 整数位 为0的话，整数位 * 倍数 也会变成0，所以会导致无法在整数位占位
    // 解决办法为当 整数位 为0时，让 1 * 倍数
    const placeholder1 = integer1 === '0' ? 1n : 0n
    const placeholder2 = integer2 === '0' ? 1n : 0n
    // 0.1 的小数位为1，0.22的小数位为22，如果直接转整数并进行运算会出现以下 (1 + 22) / 100 = 0.23 的情况
    // 而我们需要的是 (10 + 22) / 100 = 0.32，
    // 解决办法为，在长度不满足预期的小数后面补0
    Array(toString(maxTimes).length - 1 - decimal1.length).fill().forEach(() => decimal1 += '0')
    Array(toString(maxTimes).length - 1 - decimal2.length).fill().forEach(() => decimal2 += '0')
    // 使用BigInt计算出完全正确且不包含小数点的BigInt类型的整数
    const bigInt = symbol1 * ((BigInt(integer1) || 1n) * maxTimes + BigInt(decimal1)) + symbol2 * ((BigInt(integer2) || 1n) * maxTimes + BigInt(decimal2))
    const isNegative = bigInt < 0

    // 求绝对值并转成字符串
    const stringBigInt = toString(isNegative ? -1n * bigInt : bigInt)
    // 转成数组，方便进行插入小数点等字符串操作
    const arrayResult = [...stringBigInt]
    // 找到小数点从后面数的插入位置
    const pointIndex = toString(maxTimes).length - 1
    if (pointIndex === 0) return isNegative ? `-${stringBigInt}` : stringBigInt

    // 整数位置的字符串列表，每一项数据类型为字符串
    let integerStringList = arrayResult.slice(0, -pointIndex)
    // 如果用了占位符，那么整数位置需要将占位符加上的数减回去
    integerStringList = [...toString(BigInt(integerStringList.join('')) - placeholder1 -placeholder2)]
    // 小数位置的字符串列表，每一项数据类型为字符串
    const decimalStringList = arrayResult.slice(-pointIndex)

    // 定义最终的结果数组，每一项为字符串
    let resultArray = []
    // 求出小数位置的BigInt类型
    const decimalBigInt = BigInt(arrayResult.slice(-pointIndex).join(''))
    if (decimalBigInt === 0n) { // 如果小数位置为0那么不需要拼接小数点
      resultArray = [...integerStringList]
    } else { // 否则需要拼接小数点以及小数部分的字符串
      resultArray = [...integerStringList, '.', decimalStringList.join('')]
    }

    // 此时结果数组第0项有可能为. 如果为. 则在数组前面插入0
    if (resultArray[0] === '.') resultArray.unshift('0')
    // 插入正确的正负符号
    if (isNegative) resultArray.unshift('-')
    // 将结果数组转成字符串并返回
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