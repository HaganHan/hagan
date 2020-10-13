/**
 * jsonp
 */
import getQueryStringFromParams from './getQueryStringFromParams.js'

const jsonp = function (url, params, { callback = 'jsonpCallback' } = {}) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("jsonp 至少需要一个url参数!"))
    window[callback] = res => resolve(res)
    const domHead = document.querySelector("head")
    const domScriptJsonp = document.createElement("script")
    domScriptJsonp.type = "text/javascript"
    domScriptJsonp.src = getQueryStringFromParams(url, { callback, ...params })
    domHead.appendChild(domScriptJsonp)
    setTimeout(() => {
      domHead.removeChild(domScriptJsonp)
    },500)
  })
}
export default jsonp