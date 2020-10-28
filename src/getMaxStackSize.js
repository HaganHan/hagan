/**
 * 获取最大调用堆栈大小
 */

function getMaxStackSize () {
  let i = 0
  function fn () {
    i++
    fn()
  }
  try {
    fn()
  } catch (err) {
    return i
  }
}

export default getMaxStackSize