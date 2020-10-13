/**
 * 得到存储的数据
 * hagan.getLocalStorage(["username"],["password","wx"])
 * !IE8
 */

const getLocalStorage = function (name) {
  const { localStorage } = window
  const result = { }
  Object.keys(localStorage).forEach(key => {
    result[key] = JSON.parse(localStorage.getItem(key))
  })
  if (name) return result[name]
  return result
}

export default getLocalStorage