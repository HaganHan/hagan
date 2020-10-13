/**
 * 十进制转n进制
 */
import Stack from './Stack.js'

function decimalismTo (number, base = 2) {
  if (!(base >= 2 && base <= 36)) return ''
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const stack = new Stack()
  let num = number
  let stringBinary = ''
  while (num > 0) {
    const remainder = num % base
    stack.push(remainder)
    num = Math.floor(num / base)
  }
  if (!stack.isEmpty()) {
    Array(stack.size()).fill(1).forEach((item, index) => {
      stringBinary += digits[stack.pop()]
    })
  }
  return stringBinary
}

export default decimalismTo