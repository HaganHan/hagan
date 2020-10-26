
export function pow (bigInt, exponent) {
  bigInt = BigInt(bigInt)
  exponent = BigInt(exponent)
  
  if (exponent === BigInt(0)) return BigInt(1)
  let result = BigInt(1)
  for (let i = BigInt(0); i < exponent; i++) {
    result = result * bigInt
  }
  return result
}

const bigInt = { pow }

export default bigInt