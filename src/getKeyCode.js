/**
 * 得到键盘键码
 * hagan.getKeyCode(ev)
 * !IE8
 * 在Firefox和Opera中，分号键为59，但IE和Safari返回186
 */

const getKeyCode = function (ev) {
  if (ev.keyCode === 186) return 59
  return ev.keyCode
}
export default getKeyCode