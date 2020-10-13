/**
 * 过滤键盘输入
 * filterKeyboardInput(domInput1, key => key === '1')
 * !IE10
 */
import addEventListener from './addEventListener.js'

const filterKeyboardInput = function (eventElement, filterFunction = () => true) {
  addEventListener(eventElement, "keypress", ev => {
    const key = String.fromCharCode(ev.charCode)
    if (!filterFunction(key)) ev.preventDefault()
  })

}

export default filterKeyboardInput