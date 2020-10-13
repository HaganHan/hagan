/**
 * 设置存储数据
 * hagan.setLocalStorage({"username":"303738305","password":{"qq":"123456","wx":"213424"}})
 * !IE8
 */

const setLocalStorage = function (data) {
  const { localStorage } = window
  for (let key in data) {
    localStorage[key] = JSON.stringify(data[key])
  }
}

export default setLocalStorage