
export function pow (bigInt, exponent) {
  bigInt = BigInt(bigInt)
  exponent = BigInt(exponent)
  
  if (exponent === 0n) return 1n
  let result = 1n
  for (let i = 0n; i < exponent; i++) {
    result = result * bigInt
  }
  return result
}

const bigInt = { pow }

export default bigInt