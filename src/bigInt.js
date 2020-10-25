
export function pow (bigInt, exponent) {
  bigInt = BigInt(bigInt)
  
  return Array(exponent).fill(bigInt).reduce(a => a * bigInt)
}

const bigInt = { pow }

export default bigInt