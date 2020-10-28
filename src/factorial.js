/**
 * 阶乘函数
 * 5 * 4 * 3 * 2 * 1
 */

function factorial (number) {
  if (number === 0) return 1
  return number * factorial(number - 1)
}

export default factorial