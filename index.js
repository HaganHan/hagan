import _rely from './_rely'
import addEventListener from './addEventListener'
import getEventName from './getEventName'
import addTapEventListener from './addTapEventListener'
import removeEventListener from './removeEventListener'
import getOs from './getOs'
import triggerEventFunction from './triggerEventFunction'
import triggerEvent from './triggerEvent'
import triggerMouseEvent from './triggerMouseEvent'
import triggerKeyboardEvent from './triggerKeyboardEvent'
import addEntrustEventListener from './addEntrustEventListener'
import resize from './resize'
import setHtmlFontSize from './setHtmlFontSize'
import getRemFromDesignPx from './getRemFromDesignPx'
import getRemFromDomPx from './getRemFromDomPx'
import getVwFromDesignPx from './getVwFromDesignPx'
import getVwFromDomPx from './getVwFromDomPx'
import getStyle from './getStyle'
import getWindowWidth from './getWindowWidth'
import getWindowHeight from './getWindowHeight'
import getBodyWidth from './getBodyWidth'
import getBodyHeight from './getBodyHeight'
import getHtmlLeft from './getHtmlLeft'
import getHtmlTop from './getHtmlTop'
import getElementSizeInfo from './getElementSizeInfo'
import postWindow from "./postWindow"
import getQueryStringFromParams from "./getQueryStringFromParams"
import ajax from './ajax'
import jsonp from './jsonp'
import getType from './getType'
import setInterval from './setInterval'
import clearInterval from './clearInterval'
import getBase64FromImageUrl from './getBase64FromImageUrl'
import addMouseWheelEventListener from './addMouseWheelEventListener'
import removeMouseWheelEventListener from './removeMouseWheelEventListener'
import getKeyCode from './getKeyCode'
import beforeUnload from './beforeUnload'

const hagan = { // fnHideDom fnShowDom
  _rely,
  addEventListener,
  getEventName,
  addTapEventListener,
  removeEventListener,
  getOs,
  triggerEventFunction,
  triggerEvent,
  triggerMouseEvent,
  triggerKeyboardEvent,
  addEntrustEventListener,
  resize,
  setHtmlFontSize,
  getRemFromDesignPx,
  getRemFromDomPx,
  getVwFromDesignPx,
  getVwFromDomPx,
  getStyle,
  getWindowWidth,
  getWindowHeight,
  getBodyWidth,
  getBodyHeight,
  getHtmlLeft,
  getHtmlTop,
  getElementSizeInfo,
  postWindow,
  getQueryStringFromParams,
  ajax,
  jsonp,
  getType,
  setInterval,
  clearInterval,
  getBase64FromImageUrl,
  addMouseWheelEventListener,
  removeMouseWheelEventListener,
  getKeyCode,
  beforeUnload,

  //自定义右键菜单  hagan.fnCustomRightMenu(eUl);  !IE8
  fnCustomRightMenu(eUl, fn) {
    window.addEventListener("contextmenu", function (ev) {
      fn();
      ev.preventDefault();
      eUl.style.top = `${ev.pageY}px`;
      eUl.style.left = `${ev.pageX}px`;
      eUl.style.display = "block";
    });
    document.documentElement.addEventListener("click", function () {
      eUl.style.display = "none";
    });
  },

  //得到localStorage的key和value  hagan.fnGetStorage(function(key,value){});  !IE8
  fnGetStorage(fn) {
    const oStorage = window.localStorage;
    for (let i = 0, size = oStorage.length; i < size; i++) {
      fn(oStorage.key(i), oStorage.getItem(oStorage.key(i)));
    }
  },

  //获取哈希值  hagan.fnGetHash()  !IE8
  fnGetHash() {
    return location.hash.replace(/(\#)(.+)/, function ($0, $1, $2) {
      return $2;
    });
  },

  //移除元素的所有事件处理函数[并删除元素]  hagan.fnRemoveElementAllEvent(eBtn1,true);  !IE10
  fnRemoveElementAllEvent(eventElement, bDeleteElement = false) {
    if (!eventElement.id) {
      console.error(`<${eventElement.nodeName.toLocaleLowerCase()}>.id cannot is null`);
    }
    for (let attr in _rely.eventPool[eventElement.id]) {
      if (_rely.eventPool[eventElement.id][attr].nodeType !== 1 && _rely.eventPool[eventElement.id][attr] !== window) {
        this.removeEventListener(eventElement, _rely.eventPool[eventElement.id][attr].eventName, attr);
      }
    }
    if (bDeleteElement) {
      _rely.eventPool[eventElement.id] = null;
      eventElement.remove();
    }
  },

  //移除页面上的所有事件处理函数
  fnRemoveDocumentAllEvent() {
    for (let attr in _rely.eventPool) {
      this.fnRemoveElementAllEvent(_rely.eventPool[attr].eventElement);
    }
    _rely.eventPool = null;
  },

  //排除输入  hagan.fnScreeningInput(eInput,"123");  !IE10
  fnScreeningInput(eventElement, sExcept) {

    const This = this;

    This.addEventListener(eventElement, "keypress", function fnScreeningInputKeyPress(ev) {

      if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey) {

        if (sExcept.indexOf(String.fromCharCode(ev.charCode)) !== -1) {
          ev.preventDefault();
        }

      }

    });

  },

  //排除粘贴  hagan.fnScreeningPaste(eInput,["12","10"],function(){});  !IE10
  fnScreeningPaste(eventElement, aExcept, fn) {

    const This = this;

    This.addEventListener(eventElement, "paste", function fnScreeningPaste(ev) {

      for (let i = 0, size = aExcept.length; i < size; i++) {

        if (ev.clipboardData.getData("text/plain").indexOf(aExcept[i]) !== -1) {

          ev.preventDefault();

          fn();

          break

        }

      }

    });

  },

  //检测类型  hagan.getType(oopFnAjax,FnAjax);  !IE8

  //异步forEach  hagan.fnAsyncForeach(aOpt,function(item){});  !IE8
  fnAsyncForeach(aOpt, fnProcess, context = null) {

    const This = this;

    if (aOpt instanceof Array && fnProcess instanceof Function) {

      let nIndex = 0;

      function fn() {

        const nStartTime = +new Date();

        do {

          //取出下一个异步执行的参数
          const item = aOpt[nIndex];

          fnProcess.call(context, item);

          nIndex++;

        } while (nIndex < aOpt.length && +new Date() - nStartTime < 50);

        if (nIndex < aOpt.length) {

          requestAnimationFrame(fn);

        }

      }

      fn();

    } else {

      console.error("aOpt isn't a Array || fnProcess isn't a Function");

    }

  },

  //异步执行函数序列  hagan.fnAsyncProcess(aFn);  !IE8
  fnAsyncProcess(aFnProcess, aArguments = []) {

    const This = this;

    if (aFnProcess instanceof Array) {

      let nIndex = 0;

      function fn() {

        const nStartTime = +new Date();

        do {

          const fnProcess = aFnProcess[nIndex];

          if (fnProcess instanceof Function) {

            fnProcess(aArguments[nIndex], nIndex, aArguments);

          } else {

            console.error("fnProcess[" + nIndex + "] isn't a Function");

          }

          nIndex++;

        } while (nIndex < aFnProcess.length && +new Date() - nStartTime < 50);

        if (nIndex < aFnProcess.length) {

          requestAnimationFrame(fn);

        }

      }

      fn();

    } else {

      console.error("aFnProcess isn't a Array");

    }

  },

  //异步遍历数组
  fnAsyncErgodicArray(aItem, fnIng, fnEnd) {

    let nKey = 0;

    function fn() {

      const nStartTime = +new Date();

      do {

        fnIng(aItem[nKey], nKey, aItem);

        nKey++;

      } while (nKey < aItem.length && +new Date() - nStartTime < 50);

      if (nKey < aItem.length) {

        requestAnimationFrame(fn);

      } else {

        fnEnd instanceof Function && fnEnd(aItem);

      }

    }

    fn();

  },

  //设置cookie  hagan.setCookie({"username":"303738305","password":{"qq":"123456","wx":"213424"}});  !IE8
  fnSetCookie(jAllCookie, nDay = 0) {
    let oDate;
    let sDel = false;
    if (nDay > 0) {
      oDate = new Date();
      oDate.setDate(oDate.getDate() + nDay);
      oDate.toUTCString();
    } else if (nDay === 0) {
      oDate = nDay;
    } else {
      oDate = nDay;
      sDel = "关闭浏览器时清除此cookie";
    }
    for (let sAllCookieKey in jAllCookie) {
      let sCookieValue = "";
      if (typeof jAllCookie[sAllCookieKey] === "string") {
        sCookieValue += `${jAllCookie[sAllCookieKey]}&`;
      } else if (jAllCookie[sAllCookieKey] instanceof Object) {
        for (let sCookieKey in jAllCookie[sAllCookieKey]) {
          sCookieValue += `${sCookieKey}=${jAllCookie[sAllCookieKey][sCookieKey]}&`;
        }
      }
      sCookieValue = sCookieValue.replace(/(.+)\&$/, function ($0, $1) {
        return $1;
      });
      document.cookie = `${encodeURIComponent(sAllCookieKey)}=${sDel || encodeURIComponent(sCookieValue)};expires=${oDate}`;
    }
  },

  //得到cookie  hagan.getCookie(["username"],["password","wx"]);  !IE8
  fnGetCookie(aKey1, aKey2) {
    const sAllCookie = document.cookie;
    const aAllCookie = sAllCookie.split("; ");
    let jAllCookie = {};
    let result;
    for (let i = 0; i < aAllCookie.length; i++) {
      const aCookie = aAllCookie[i].split("=");
      jAllCookie[aCookie[0]] = aCookie[1];
    }
    for (let sCookieKey in jAllCookie) {
      jAllCookie[sCookieKey] = decodeURIComponent(jAllCookie[sCookieKey]);
      if (jAllCookie[sCookieKey].indexOf("=") !== -1) {
        const aCookieValue = jAllCookie[sCookieKey].split("&");
        jAllCookie[sCookieKey] = {};
        for (let i = 0; i < aCookieValue.length; i++) {
          const aSubCookie = aCookieValue[i].split("=");
          jAllCookie[sCookieKey][aSubCookie[0]] = aSubCookie[1];
        }
      }
    }
    if (arguments.length === 0) {
      result = jAllCookie;
    } else {
      result = [];
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Array) {
          switch (arguments[i].length) {
            case 1:
              if (jAllCookie[arguments[i][0]] === undefined) {
                console.error(`jAllCookie.${arguments[i][0]} is undefined`);
              }
              result.push(jAllCookie[arguments[i][0]]);
              break;
            case 2:
              try {
                if (jAllCookie[arguments[i][0]][arguments[i][1]] === undefined) {
                  console.error(`jAllCookie.${arguments[i][0]}.${arguments[i][1]} is undefined`);
                  result.push(undefined);
                } else {
                  result.push(jAllCookie[arguments[i][0]][arguments[i][1]]);
                }
              } catch (err) {
                result.push(undefined);
                console.error(`jAllCookie.${arguments[i][0]}.${arguments[i][1]} is undefined`);
              }
              break;
          }
        }
      }
    }
    return result;
  },

  //删除cookie(不能删除子cookie)  hagan.delCookie(["username"],["password"]);  !IE8
  fnDelCookie(aKey, aKey2) {
    const This = this;
    const jAllCookie = This.fnGetCookie();
    if (arguments.length === 0) {
      for (let sAllCookieKey in jAllCookie) {
        document.cookie = `${encodeURIComponent(sAllCookieKey)}=关闭浏览器时清除此cookie;expires=-1`;
      }
    } else {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Array) {
          switch (arguments[i].length) {
            case 1:
              document.cookie = `${encodeURIComponent(arguments[i][0])}=关闭浏览器时清除此cookie;expires=-1`;
              break;
            case 2:
              document.cookie = `${encodeURIComponent(arguments[i][0])}=关闭浏览器时清除此cookie;expires=-1`;
              break;
          }
        }
      }
    }
  },

  //设置存储数据  hagan.fnSetStorage({"username":"303738305","password":{"qq":"123456","wx":"213424"}});  !IE8
  fnSetStorage(jData, sStorageType = localStorage) {
    for (let sKey in jData) {
      sStorageType[sKey] = JSON.stringify(jData[sKey]);
    }
  },

  //得到存储的数据  hagan.fnGetStorage(["username"],["password","wx"]);  !IE8
  fnGetStorage(sStorageType = localStorage) {
    let result = {};
    for (let i = 0; i < sStorageType.length; i++) {
      const sKey = sStorageType.key(i);
      const sValue = JSON.parse(sStorageType.getItem(sKey));
      result[sKey] = sValue;
    }
    return result
  },

  //删除存储的数据  hagan.fnDelStorage();  !IE8
  fnDelStorage(sStorageType = localStorage) {
    sStorageType.clear();
  },

  //得到整数
  fnGetInteger(nNum) {
    if (this.getType(nNum) === "Number") {
      return Math[nNum < 0 ? "ceil" : "floor"](nNum);
    } else {
      console.error(`nNum isn't Number`);
    }
  },

  //移除字符串首尾空格
  fnTrim(sString) {
    if (this.getType(sString) === "String") {
      return sString.replace(/^\s+|\s+$/g, "");
    }
  },

  //截取base64
  fnInterceptBase64(sBase64) {
    return sBase64.replace(/(.+\,)(.+)/, function ($0, $1, $2) {
      return $2;
    });
  },

  // 将以base64的图片url数据转换为Blob @param urlData 用url方式表示的base64图片数据
  fnConvertBase64UrlToBlob(urlData) {

    let bytes;
    try {//去掉url的头，并转换为byte
      bytes = window.atob(urlData);
    } catch (err) {
      bytes = window.atob(this.fnInterceptBase64(urlData));
    }

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/png' });
  },

  //得到img.onload的尺寸信息  hagan.fnGetImgSizeInfo(ev);
  fnGetImgSizeInfo(evImgLoad) {

    const nWidth = evImgLoad.target.width || evImgLoad.path[0].width;
    const nHeight = evImgLoad.target.height || evImgLoad.path[0].height;
    const nScale = Math.round((nWidth / nHeight) * 100) / 100;

    return { nWidth, nHeight, nScale };
  },

  //统一移动端与pc端获取鼠标和手指位置方法
  fnGetClientX(ev) {

    return ev.clientX || ev.changedTouches[0].clientX;
  },

  fnGetClientY(ev) {
    return ev.clientY || ev.changedTouches[0].clientY;
  },

  fnGetPageX(ev) {
    return ev.pageX || ev.changedTouches[0].pageX;
  },

  fnGetPageY(ev) {
    return ev.pageY || ev.changedTouches[0].pageY;
  },

  //类数组转为数组
  fnToArray(aClassArray) {
    const aResult = [];
    for (let i = 0; i < aClassArray.length; i++) {
      aResult[i] = aClassArray[i];
    }
    return aResult;
  },

  //缓存递归函数前一个计算结果供后续使用
  fnMemoize(fnRecursion, oObj) {

    oObj = oObj || {};

    return function (opt) {
      if (!oObj.hasOwnProperty(opt)) {
        oObj[opt] = fnRecursion(opt);
      }
      return oObj[opt];
    }

  },

  //阶乘函数
  fnFactorial(nNum) {
    if (nNum === 0) {
      return 1;
    } else {
      return nNum * hagan.fnFactorial(nNum - 1);
    }
  },

  fnHideDom(eventElement, nTime = 500, fnCallBack = Function) {

    const domInfo = _rely.hideDomInfo[eventElement.id] = _rely.hideDomInfo[eventElement.id] || {};

    if (domInfo.lock) {
      return console.warn(`${eventElement.id}正在show or hide，请show or hide结束后再调用hide方法`);
    }

    domInfo.lock = true;

    domInfo.opacity = this.getStyle(eventElement, "opacity"); //获取对应dom的opacity初始值并储存到hagan._rely.hideDomInfo对象上
    eventElement.style.opacity = domInfo.opacity; //设置对应dom的opacity初始值

    domInfo.display = this.getStyle(eventElement, "display"); //储存对应dom的display初始值到hagan对象上

    const times = nTime / 25; //过渡多少次

    const item = domInfo.opacity / times; //每次应该减少多少

    const hide = (ms) => {
      setTimeout(() => {
        eventElement.style.opacity = Number(eventElement.style.opacity) - item;
        if (eventElement.style.opacity > 0) {
          hide(nTime / (times - 1));
        } else {
          eventElement.style.opacity = 0;
          eventElement.style.display = "none";
          domInfo.lock = false;
        }
      }, ms);
    };

    hide(0);

    // document.head.innerHTML += `
    //     <style>
    //         .a-HideDom {
    //             opacity: 0;
    //             animation: kf-HideDom ${nTime}ms;
    //         }
    //         @keyframes kf-HideDom {
    //             0% {
    //                 opacity: 1;
    //             }
    //             100% {
    //                 opacity: 0;
    //             }
    //         }
    //     </style>
    // `;
    //
    // this.fnHideDom = function (eventElement, nTime = 500, fnCallBack = Function) {
    //
    //     eventElement.classList.remove("a-ShowDom");
    //     eventElement.classList.add("a-HideDom");
    //     setTimeout(function () {
    //         eventElement.classList.add("z-none");
    //         fnCallBack();
    //     }, nTime);
    //
    // };
    // this.fnHideDom(eventElement, nTime, fnCallBack);

  },

  fnShowDom(eventElement, nTime = 500, fnCallBack = Function) {

    const domInfo = _rely.hideDomInfo[eventElement.id];

    if (domInfo.lock) {
      return console.warn(`${eventElement.id}正在show or hide，请show or hide结束后再调用show方法`);
    }

    domInfo.lock = true;

    const targetOpacity = domInfo.opacity;
    eventElement.style.display = domInfo.display;

    const times = nTime / 25; //过渡多少次

    const item = targetOpacity / times; //每次应该增加多少

    const show = (ms) => {
      setTimeout(() => {
        eventElement.style.opacity = Number(eventElement.style.opacity) + item;
        if (eventElement.style.opacity < targetOpacity) {
          show(nTime / (times - 1));
        } else {
          eventElement.style.opacity = targetOpacity;
          domInfo.lock = false;
        }
      }, ms);
    };

    show(0);
    // document.head.innerHTML += `
    //     <style>
    //         .a-ShowDom {
    //             opacity: 1;
    //             animation: kf-ShowDom ${nTime}ms;
    //         }
    //         @keyframes kf-ShowDom {
    //             0% {
    //                 opacity: 0;
    //             }
    //             100% {
    //                 opacity: 1;
    //             }
    //         }
    //     </style>
    // `;
    //
    // this.fnShowDom = function (eventElement, nTime = 500, fnCallBack = Function) {
    //
    //     eventElement.classList.remove("z-none");
    //     eventElement.classList.remove("a-HideDom");
    //     eventElement.classList.add("a-ShowDom");
    //     setTimeout(function () {
    //         fnCallBack();
    //     }, nTime);
    //
    // };
    // this.fnShowDom(eventElement, nTime, fnCallBack);

  },

  //判断是否是竖屏
  fnIsVerticalScreen() {

    let bResult;

    if (this.getWindowWidth() > this.getWindowHeight()) {
      bResult = false;
    } else {
      bResult = true;
    }

    return bResult;

  },

  //判断是否是手机号
  fnJudgeCellphoneNumber(nCellphoneNumber) {
    const re = /^1\d{10}$/;
    if (re.test(nCellphoneNumber)) {
      return true;
    } else {
      return false;
    }
  }

};

export default hagan