/**
 * 删除存储的数据
 * hagan.removeLocalStorage()
 * !IE8
 */

const removeLocalStorage = function (name) {
  const { localStorage } = window
  if (name) return localStorage.removeItem(name)
  localStorage.clear()
}

export default removeLocalStorage