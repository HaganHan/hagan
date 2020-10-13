/**
 * 过滤粘贴
 * filterPaste(domInput1, key => key !== '1')
 * !IE10
 */
import addEventListener from './addEventListener.js'

 const filterPaste = function (eventElement, filterFunction) {
   addEventListener(eventElement, "paste", ev => {
    const pasteValue =  ev.clipboardData.getData("text/plain")
    console.log('pasteValue: ', pasteValue)
    if (!filterFunction(pasteValue)) ev.preventDefault()
  })
}

export default filterPaste