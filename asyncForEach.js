/**
 * 异步forEach
 * await asyncForEach(arr, item => { }, {})
 * !IE8
 */

const asyncForEach = function (array = [], process = () => { }, context = null) {
  return new Promise((resolve, reject) => {
    let index = 0
    const fn = function () {
      const startTime = Date.now()

      do {
        const item = array[index] // 取出下一个异步执行的参数
        process.call(context, item)
        index++
        if (index >= array.length) resolve()
      } while (index < array.length && Date.now() - startTime < 16)

      if (index < array.length) requestAnimationFrame(fn)
    }
    fn()
  })
}

export default asyncForEach