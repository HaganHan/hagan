/**
 * 自定义右键菜单
 * hagan.customRightMenu(dom)
 * !IE8
 */

const customRightMenu = function (dom, callback = () => {}) {
  dom.style.display = 'none'
  window.addEventListener('contextmenu', (ev) => {
    ev.preventDefault()
    callback()
    dom.style.position = 'fixed'
    dom.style.top = `${ev.clientY}px`
    dom.style.left = `${ev.clientX}px`
    dom.style.display = 'block'
  })
  document.documentElement.addEventListener('click', () => {
    dom.style.display = 'none'
  })
}

export default customRightMenu