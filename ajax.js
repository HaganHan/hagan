/**
 * ajax
 */
import getType from './getType.js'
import getQueryStringFromParams from './getQueryStringFromParams.js'

const ajax = function (
  {
    method = 'GET',
    url = '/api',
    params = {},
    progress,
    timeout,
    timeoutCallback
  }
) {
  return new Promise((resolve, reject) => {
    const methodType = method.toUpperCase()
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    if (getType(progress) === 'Function') {
      xhr.onprogress = ev => progress(ev.total, ev.loaded)
    }
    if (getType(timeout) === "Number") {
      xhr.timeout = timeout
      xhr.ontimeout = () => {
        if (getType(timeoutCallback) === 'Function') timeoutCallback()
      }
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return

      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText))
      }
    }
    xhr.onerror = function () {
      reject(new Error(xhr.statusText))
    }

    if (methodType === "GET") {
      xhr.open(methodType, getQueryStringFromParams(url, params))
    } else {
      xhr.open(methodType, url)
    }

    // xhr.setRequestHeader("content-type", "multipart/form-data")
    xhr.setRequestHeader("content-type", "application/json")

    if (methodType === "GET") {
      xhr.send(null)
    } else {
      xhr.send(JSON.stringify(params))
    }
  })
}

export default ajax