/**
 * 随机算法
 */

/**
 * 洗牌算法
 */
export function shuffle (array) {
  const arr = [...array]
  const { length } = arr
  if (length <= 1) return arr
  for (let i = length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}

const random = {
  shuffle
}

export default random