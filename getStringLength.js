/**
 * 正确返回Unicode字符串的长度
 * 兼容:
 *    基本多文种平面 '韩'
 *    辅助平面 '𠮷'
 * 
 * 
 *    组合标记 'q̣̇' 'Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞'
 * 
 * 
 * 目前无法正确处理 '👨‍👩‍👧‍👦'之类的组合标记
 */


const getStringLength = function (string) {
  const regex = /(\P{Mark})(\p{Mark}+)/gu
  const str = string.replace(regex, ($0, $1, $2) => $1)
  return Array.from(str).length
}

export default getStringLength