(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.hagan = factory());
}(this, (function () { 'use strict';

  const _rely = { // 所有的依赖信息
    _eventPool: {}, // 存着所有元素id绑定的事件函数
    _tapEventPool: {}, // tap事件封装所需的必要属性
    _rem: 0, // 存着html标签上的字体大小
    _timer: {}, // 存着模拟定时器的执行序列
    _mouseWheel: {}, // 存着所有绑定的滚轮事件
    _hideDomId: 0,
    _hideDom: {}, // 元素hide前的display状态
  };

  /**
   * 获取系统名称
   */

  let getOs = function () {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      getOs = function () { // 惰性载入函数
        return 'ios'
      };
      return 'ios'
    } else if (/android/.test(userAgent)) {
      getOs = function () { // 惰性载入函数
        return 'android'
      };
      return 'android'
    } else {
      getOs = function () { // 惰性载入函数
        return 'pc'
      };
      return 'pc'
    }
  };

  var getOs$1 = getOs;

  /**
   * 根据当前设备类型返回对应事件名称
   */

  const getEventName = function (eventName) {
    const os = getOs$1();
    if (os === 'pc') {
      switch (eventName) {
        case "touchstart":
          return "mousedown";
        case "touchmove":
          return "mousemove";
        case "touchend":
          return "mouseup";
        case "tap":
          return "click";
        default:
          return eventName;
      }
    }
    if (os === 'android' || os === 'ios') {
      switch (eventName) {
        case "mousedown":
          return "touchstart";
        case "mousemove":
          return "touchmove";
        case "mouseup":
          return "touchend";
        case "click":
          return "tap";
        default:
          return eventName;
      }
    }
  };

  /**
   * tap事件封装
   */

  const addTapEventListener = function (_eventId) {
    const { _eventElement, _eventFunction, _eventCapture } = _rely._eventPool[_eventId];
    let moved;
    const touchMoveEventFunction = function () {
      moved = false;
    };
    const touchEndEventFunction = function (ev) {
      if (moved) _eventFunction.call(_eventElement, ev);
      _eventElement.removeEventListener("touchmove", touchMoveEventFunction, _eventCapture);
      _eventElement.removeEventListener("touchend", touchEndEventFunction, _eventCapture);
    };
    const touchStartEventFunction = function () {
      moved = true;
      _eventElement.addEventListener("touchmove", touchMoveEventFunction, _eventCapture);
      _eventElement.addEventListener("touchend", touchEndEventFunction, _eventCapture);

    };
    _eventElement.addEventListener("touchstart", touchStartEventFunction, _eventCapture);
    _rely._tapEventPool[_eventId] = {
      _eventElement,
      _eventName: 'touchstart',
      _eventFunction: touchStartEventFunction,
      _eventCapture
    };
  };

  /**
   * 绑定对象的事件函数
   * hagan.addEventListener(eBtn,"click",function fnAlert1(){})
   * !IE10
   */

  const addEventListener = function (eventElement, eventName, eventFunction, eventCapture = false) {
    const _eventId = Symbol('_eventId');
    const _eventElement = eventElement;
    const _eventName = getEventName(eventName);
    const _eventFunction = eventFunction;
    const _eventCapture = eventCapture;
    _rely._eventPool[_eventId] = {  _eventElement, _eventName, _eventFunction, _eventCapture };

    if (_eventElement.nodeType === 1 || _eventElement === window) {
      if (_eventName === "tap") {
        addTapEventListener(_eventId);
      } else {
        _eventElement.addEventListener(_eventName, _eventFunction, _eventCapture);
      }
    }
    return _eventId
  };

  /**
   * 解除对象的事件函数绑定
   * hagan.removeEventListener(eBtn,"click","fnAlert1")
   * !IE10
   */
   
  function removeEventListener (_eventId) {
    if (!_rely._eventPool[_eventId]) return
    const { _eventElement, _eventName, _eventFunction, _eventCapture } = _rely._eventPool[_eventId];
    if (_eventName === "tap") {
      if (_rely._tapEventPool[_eventId]) {
        const { _eventElement, _eventName, _eventFunction, _eventCapture } = _rely._tapEventPool[_eventId];
        _eventElement.removeEventListener(_eventName, _eventFunction, _eventCapture);
        _rely._tapEventPool[_eventId] = null;
      }
    } else {
      _eventElement.removeEventListener(_eventName, _eventFunction, _eventCapture);
    }
    _rely._eventPool[_eventId] = null;
  }

  /**
   * //主动触发对象的事件函数  hagan.fnFireEventFn(eBtn,"fnTest")
   * !IE10
   */

  const triggerEventFunction = function (_eventId, eventObject) {
    const { _eventElement, _eventFunction } = _rely._eventPool[_eventId];
    _eventFunction.call(_eventElement, eventObject);
  };

  /**
   * 主动触发对象的事件
   * hagan.fnFireEvent(eBtn,"test")
   * !IE10
   */

  const triggerEvent = function (eventElement, eventName, eventObject) {
    eventName = getEventName(eventName);
    Object.keys(_rely._eventPool).forEach(key => {
      const { _eventElement, _eventName, _eventFunction } = _rely._eventPool[key];
      if (_eventElement === eventElement && _eventName === eventName) {
        if (_eventFunction instanceof Function) {
          _eventFunction.call(_eventElement, eventObject);
        }
      }
    });
  };

  /**
   * 主动触发元素的鼠标事件
   * hagan.triggerMouseEvent(domDiv1, 'click', { clientX: 280, clientY: 280 })
   */

  const triggerMouseEvent = function (eventElement, eventName, eventObject) {
    eventName = getEventName(eventName);
    const mouseEvent = new MouseEvent(eventName, eventObject);
    eventElement.dispatchEvent(mouseEvent);
  };

  /**
   * 主动触发元素的键盘事件
   * hagan.triggerKeyboardEvent(eBtn, "click", {"keyCode":13})
   * Firefox
   */

  const triggerKeyboardEvent = function (
    eventElement,
    eventName,
    { keyboardAlt = false, keyboardCtrl = false, keyboardShift = false, keyCode = 0 }
  ) {
    const event = document.createEvent("Events");
    event.initEvent(eventName, true, true);
    event.view = document.defaultView;
    event.altKey = keyboardAlt;
    event.ctrlKey = keyboardCtrl;
    event.shiftKey = keyboardShift;
    event.metaKey = false;
    event.keyCode = keyCode;
    event.charCode = keyCode;
    eventElement.dispatchEvent(event);
  };

  /**
   * 委托元素的事件函数绑定
   * hagan.addEntrustEventListener(document.body,"click",{"btn1":function(){},"btn2":function(){}}
   * !IE10
   */

  const addEntrustEventListener = function (eventElement, eventName, optionEventFunction, eventCapture = false) {
    const _eventId = addEventListener(eventElement, eventName, function (ev) {
      let targetId = '';
      try {
        targetId = ev.srcElement.id;
      } catch (err) {
        targetId = ev.originalTarget.id;
      }
      Object.keys(optionEventFunction).forEach(id => {
        if (id === targetId) {
          optionEventFunction[id]();
        }
      });
    }, eventCapture);
    return _eventId
  };

  /**
   * 模拟窗口大小改变事件且优化性能
   * hagan.resize(function(){})
   * !IE8
   */

  const resize = function (resizeFunction, initRun = false) {
    if (initRun) resizeFunction();
    let timer = null;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resizeFunction();
      }, 500);
    }, false);
  };

  /**
   * 得到文档总宽度
   * getDocumentWidth()
   * !IE8
   */

  let getHtmlWidth = function () {
    let documentWidth;
    resize(() => {
      documentWidth = Math.max(document.documentElement.scrollWidth, (document.documentElement.clientWidth || window.innerWidth));
      getHtmlWidth = function () { // 惰性载入函数
        return documentWidth
      };
    }, true);
    return documentWidth
  };

  var getHtmlWidth$1 = getHtmlWidth;

  /**
   * 动态设置html根节点的字体大小
   * hagan.setHtmlFontSize()
   * !IE8
   */

  const setHtmlFontSize = function () {
    const domHtml = document.querySelector("html");
    const domBody = document.querySelector("body");
    let bodyWidth;

    resize(() => {
      bodyWidth = getHtmlWidth$1();
      _rely._rem = bodyWidth / 10;
      domHtml.style.fontSize = `${_rely._rem}px`;
      domBody.style.fontSize = `0.4rem`;
    }, true);
  };

  /**
   * 根据设计图px单位得到rem单位
   */

  const getRemFromDesignPx = function (designPx, designTotalPxWidth = 750) {
    return 10 * designPx / designTotalPxWidth;
  };

  /**
   * 根据js获取的dom px单位得到rem单位
   */

  const getRemFromDomPx = function (domPx) {
    return domPx / _rely._rem
  };

  /**
   * 根据设计图px单位得到vw单位
   */

  const getVwFromDesignPx = function (designPx, designTotalPxWidth = 750) {
    return designPx / designTotalPxWidth * 100
  };

  /**
   * 根据js获取的dom px单位得到vw单位
   */

  const getRemFromDomPx$1 = function (domPx) {
    const windowWidth = getHtmlWidth$1();
    return domPx / windowWidth * 100
  };

  /**
   * 得到计算后的样式
   * hagan.getStyle(eDiv,"width",":after")
   * !IE8
   */

  const getStyle = function (eventElement, styleName, pseudoElement = null) {
    return document.defaultView.getComputedStyle(eventElement, pseudoElement)[styleName];
  };

  /**
   * 得到视口宽度
   */

  let getWindowWidth = function () {
    let windowWidth;
    resize(() => {
      windowWidth = document.documentElement.clientWidth || window.innerWidth;
      getWindowWidth = function () { // 惰性载入函数
        return windowWidth
      };
    }, true);
    return windowWidth
  };

  var getWindowWidth$1 = getWindowWidth;

  /**
   * 得到视口高度
   */

  let getWindowHeight = function () {
    let windowHeight;
    resize(() => {
      windowHeight = document.documentElement.clientHeight || window.innerHeight;
      getWindowHeight = function () { // 惰性载入函数
        return windowHeight
      };
    }, true);
    return windowHeight
  };

  var getWindowHeight$1 = getWindowHeight;

  /**
   * 得到文档总宽度
   * hagan.getDocumentWidth()
   * !IE8
   */

  let getHtmlWidth$2 = function () {
    let documentHeight;
    resize(() => {
      documentHeight =  Math.max(document.documentElement.scrollHeight, (document.documentElement.clientHeight || window.innerHeight));
      getHtmlWidth$2 = function () { // 惰性载入函数
        return documentHeight
      };
    }, true);
    return documentHeight
  };

  var getHtmlHeight = getHtmlWidth$2;

  /**
   * 得到元素位置尺寸信息  hagan.getElementSizeInfo(eDiv1)  !IE8
   */

  // 得到元素至html最左边的距离
  const getHtmlLeft = function (eventElement) {
    let [result, domPositionPar] = [0, eventElement];
    while (domPositionPar) {
      result += domPositionPar.offsetLeft;
      domPositionPar = domPositionPar.offsetParent;
    }
    return result
  };

  // 得到元素至html顶部的距离
  const getHtmlTop = function (eventElement) {
    let [result, domPositionPar] = [0, eventElement];
    while (domPositionPar) {
      result += domPositionPar.offsetTop;
      domPositionPar = domPositionPar.offsetParent;
    }
    return result
  };

  let getElementRectInfo = function (eventElement) {
    let result;
    resize(() => {
      // const boundingClientRect = eventElement.getBoundingClientRect()
      // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      // return {
      //   "pageX": boundingClientRect.left + scrollLeft,
      //   "pageY": boundingClientRect.top + scrollTop,
      //   "width": boundingClientRect.width,
      //   "height": boundingClientRect.height
      // }
      let toHtmlTop = 0;
      let toHtmlLeft = 0;
      let width = 0;
      let height = 0;
      let scrollTop = 0;
      let scrollLeft = 0;
      let toWindowTop = 0;
      let toWindowLeft = 0;

      if (eventElement === window) {
        width = getWindowWidth$1();
        height = getWindowHeight$1();
      } else if (eventElement === document.querySelector('html')) {
        width = getHtmlWidth$1();
        height = getHtmlHeight();
      } else if (eventElement.nodeType === 1) {
        toHtmlTop = eventElement.clientTop || eventElement.offsetTop || getHtmlTop(eventElement);
        toHtmlLeft = eventElement.clientLeft || eventElement.offsetLeft || getHtmlLeft(eventElement);
        width = eventElement.clientWidth || eventElement.offsetWidth;
        height = eventElement.clientHeight || eventElement.offsetHeight;
        scrollTop = document.documentElement.scrollTop;
        scrollLeft = document.documentElement.scrollLeft;
        toWindowTop = toHtmlTop - scrollTop;
        toWindowLeft = toHtmlLeft - scrollLeft;
      }
      result = {
        width,
        height,
        toHtmlTop,
        toHtmlLeft,
        toWindowTop,
        toWindowLeft
      };
    }, true);
    return result
  };

  /**
   * post打开页面
   * hagan.getDocumentWidth()
   * !IE8
   */

  const postWindow = function ({action = '', params = [], target = '_blank'}) {
    const domForm = document.createElement('form');
    domForm.style.display = 'none';
    domForm.action = action;
    domForm.method = 'post';
    domForm.target = target;
    params.forEach(item => {
      const domInput = document.createElement('input');
      domInput.type = 'text';
      domInput.name = item.key;
      domInput.value = item.value;
      domForm.appendChild(domInput);
    });
    const domBody = document.body;
    domBody.appendChild(domForm);
    domForm.submit();
    domBody.removeChild(domForm);
  };

  /**
   * 根据params得到查询字符串
   */

  const getQueryStringFromParams = function (urlOrigin, params) {
    let url = urlOrigin;
    if (url.indexOf("?") === -1) {
      url += "?";
    } else {
      url += "&";
    }
    Object.keys(params).forEach(paramKey => {
      url += `${encodeURIComponent(paramKey)}=${encodeURIComponent(params[paramKey])}&`;
    });
    return url.substring(0, url.length - 1)
   };

  /**
   * 获取对象类型
   * getType('abc') // String
   * !IE8
   */

  const getType = function (target) {
    switch (Object.prototype.toString.call(target)) {
      case '[object Symbol]':
        return 'Symbol'
      
      case '[object Number]':
        if (isNaN(target)) return 'NaN'
        if (isFinite(target)) return 'Number'
        return 'Infinity'

      case '[object String]':
        return 'String'

      case '[object Null]':
        return 'Null'

      case '[object Undefined]':
        return 'Undefined'

      case '[object Boolean]':
        return 'Boolean'

      case '[object Function]':
        return 'Function'

      case '[object Date]':
        return 'Date'

      case '[object Array]':
        return 'Array'

      case '[object RegExp]':
        return 'RegExp'

      case '[object Object]':
        try {
          return target.constructor.name || 'Object'
        } catch (err) {
          return 'Object'
        }

      case '[object BigInt]':
        return 'BigInt'

      default:
        return 'Unknown'
    }
  };

  /**
   * ajax
   */

  const ajax = function (url, params = {}, { method = 'GET', progress, timeout, timeoutCallback } = {}) {
    return new Promise((resolve, reject) => {
      const methodType = method.toUpperCase();
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      if (getType(progress) === 'Function') {
        xhr.onprogress = ev => progress(ev.total, ev.loaded);
      }
      if (getType(timeout) === "Number") {
        xhr.timeout = timeout;
        xhr.ontimeout = () => {
          if (getType(timeoutCallback) === 'Function') timeoutCallback();
        };
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return

        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.response);
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.onerror = function () {
        reject(new Error(xhr.statusText));
      };

      if (methodType === "GET") {
        xhr.open(methodType, getQueryStringFromParams(url, params));
      } else {
        xhr.open(methodType, url);
      }

      // xhr.setRequestHeader("content-type", "multipart/form-data")
      xhr.setRequestHeader("content-type", "application/json");

      if (methodType === "GET") {
        xhr.send(null);
      } else {
        xhr.send(JSON.stringify(params));
      }
    })
  };

  /**
   * jsonp
   */

  const jsonp = function (url, params, { callback = 'jsonpCallback' } = {}) {
    return new Promise((resolve, reject) => {
      if (!url) return reject(new Error("jsonp 至少需要一个url参数!"))
      window[callback] = res => resolve(res);
      const domHead = document.querySelector("head");
      const domScriptJsonp = document.createElement("script");
      domScriptJsonp.type = "text/javascript";
      domScriptJsonp.src = getQueryStringFromParams(url, { callback, ...params });
      domHead.appendChild(domScriptJsonp);
      setTimeout(() => {
        domHead.removeChild(domScriptJsonp);
      },500);
    })
  };

  /**
   * 设置自定义定时器
   * hagan.fnSetInterval(function nTimer1(){},1000)
   * !IE10
   * 为了防止后一个调用会在前一个调用结束之前执行, 使用setTimeout模拟setInterval
   */

  const setInterval = function (callback, delay, arg = []) {
    const _timerId = Symbol('_timerId');
    (function loop() {
      if (_rely._timer[_timerId] === null) return
      clearTimeout(_rely._timer[_timerId]);
      _rely._timer[_timerId] = setTimeout(() => {
        callback(...arg);
        loop();
      }, delay);
    })();
    return _timerId
  };

  /**
   * 清除自定义定时器
   * hagan.fnSetInterval("nTimer1")
   * !IE10
   */

  const clearInterval = function (_timerId) {
    clearTimeout(_rely._timer[_timerId]);
    _rely._timer[_timerId] = null;
  };

  /**
   * 
   * 闭包:返回对应图片的base64
   * !IE10
   * const jBase64=hagan.fnGetImageBase64("backImage.jpg");
   * jBase64["oImage"].onload=()=>{const sBase64=jBase64["fnOnLoad"]()["str"]};
   */

  const getBase64FromImageUrl = function (imageUrl) {//调用该方法返回一个以传入链接创建的一个图片标签和该图片标签的onload事件组成的json
    return new Promise((resolve, reject) => {
      const domImage = document.createElement("img");
      domImage.crossOrigin = "Anonymous";
      domImage.style.verticalAlign = "middle";
      domImage.onload = () => { // 调用该方法返回base64的原始数据和经过处理的str数据组成的json
        const domCanvas = document.createElement("canvas");
        domCanvas.width = domImage.width;
        domCanvas.height = domImage.height;
        const context = domCanvas.getContext("2d");
        context.drawImage(domImage, 0, 0, domImage.width, domImage.height);
        const suffix = domImage.src.substring(domImage.src.lastIndexOf(".") + 1).toLowerCase();
        const base64 = domCanvas.toDataURL(`image/${suffix}`);
        resolve(base64);
      };
      domImage.src = imageUrl;
    })
  };

  /**
   * 截取base64
   */

  const getBase64String = function (base64) {
    return base64.replace(/(.+\,)(.+)/, ($0, $1, $2) => $2)
  };

  /**
   * 将base64图片转换为Blob
   */

  const getBlobFromBase64 = function (base64) {

    let bytes;
    try { // 去掉url的头，并转换为byte
      bytes = window.atob(base64);
    } catch (err) {
      const base64String = getBase64String(base64);
      bytes = window.atob(base64String);
    }
    console.log('bytes: ', Object.keys(bytes));

    // 处理异常,将ascii码小于0的转换为大于0
    const arrayBuffer = new ArrayBuffer(bytes.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    Object.keys(bytes).forEach(key => {
      uint8Array[key] = bytes.charCodeAt(key);
    });
    return new Blob([arrayBuffer], { type: 'image/png' });
  };

  /**
   * 给元素添加滚轮事件
   * hagan.addMouseWheelEventListener(window,function fn(){},function fn(){})
   * !IE8
   */

  const addMouseWheelEventListener = function (eventElement, upCallback, downCallback, eventCapture = false) {
    const _mouseWheelId = Symbol('_mouseWheelId');
    const _eventElement = eventElement;
    const _eventFunction = function (ev) {
      ev.wheelDelta ? (ev.wheelDelta > 0 ? upCallback(ev) : downCallback(ev)) : (ev.detail < 0 ? upCallback(ev) : downCallback(ev));
    };
    const _eventCapture = eventCapture;
    _rely._mouseWheel[_mouseWheelId] = { _eventElement, _eventFunction, _eventCapture };
    _eventElement.addEventListener("mousewheel", _eventFunction, _eventCapture);
    _eventElement.addEventListener("DOMMouseScroll", _eventFunction, _eventCapture);
    return _mouseWheelId
  };

  /**
   * 移除元素滚轮事件
   * hagan.removeMouseWheelEventListener(window,"fn")
   * !IE8
   */

  const removeMouseWheelEventListener = function (_mouseWheelId) {
    if (!_rely._mouseWheel[_mouseWheelId]) return
    const { _eventElement, _eventFunction, _eventCapture } = _rely._mouseWheel[_mouseWheelId];
    _eventElement.removeEventListener("mousewheel", _eventFunction, _eventCapture);
    _eventElement.removeEventListener("DOMMouseScroll", _eventFunction, _eventCapture);
  };

  /**
   * 得到键盘键码
   * hagan.getKeyCode(ev)
   * !IE8
   * 在Firefox和Opera中，分号键为59，但IE和Safari返回186
   */

  const getKeyCode = function (ev) {
    if (ev.keyCode === 186) return 59
    return ev.keyCode
  };

  /**
   * 浏览器关闭事件
   * hagan.beforeUnload("是否关闭？")
   * !IE10
   */

  const beforeUnload = function (message, callback = () => {}) {
    const eventFunction = function (ev) {
      callback();
      ev.returnValue = message;
      ev.preventDefault();
      return message
    };
    window.removeEventListener("beforeunload", eventFunction);
    window.addEventListener("beforeunload", eventFunction);
  };

  /**
   * 自定义右键菜单
   * hagan.customRightMenu(dom)
   * !IE8
   */

  const customRightMenu = function (dom, callback = () => {}) {
    dom.style.display = 'none';
    window.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      callback();
      dom.style.position = 'fixed';
      dom.style.top = `${ev.clientY}px`;
      dom.style.left = `${ev.clientX}px`;
      dom.style.display = 'block';
    });
    document.documentElement.addEventListener('click', () => {
      dom.style.display = 'none';
    });
  };

  /**
   * 设置存储数据
   * hagan.setLocalStorage({"username":"303738305","password":{"qq":"123456","wx":"213424"}})
   * !IE8
   */

  const setLocalStorage = function (data) {
    const { localStorage } = window;
    for (let key in data) {
      localStorage[key] = JSON.stringify(data[key]);
    }
  };

  /**
   * 得到存储的数据
   * hagan.getLocalStorage(["username"],["password","wx"])
   * !IE8
   */

  const getLocalStorage = function (name) {
    const { localStorage } = window;
    const result = { };
    Object.keys(localStorage).forEach(key => {
      result[key] = JSON.parse(localStorage.getItem(key));
    });
    if (name) return result[name]
    return result
  };

  /**
   * 删除存储的数据
   * hagan.removeLocalStorage()
   * !IE8
   */

  const removeLocalStorage = function (name) {
    const { localStorage } = window;
    if (name) return localStorage.removeItem(name)
    localStorage.clear();
  };

  /**
   * 移除元素的所有事件处理函数
   * hagan.removeDomElement(eBtn1,true)
   * !IE10
   */

  const removeDomElement = function (eventElement) {
    const { _eventPool } = _rely;

    Object.keys(_eventPool).forEach(_eventId => {
      if (_eventPool[_eventId] === null) return
      const { _eventElement } = _eventPool[_eventId];
      if (_eventElement === eventElement) {
        removeEventListener(_eventId);
      }
    });
    eventElement.remove();
  };

  /**
   * 移除页面上的所有事件处理函数
   */

  const removeAllEventListener = function () {
    const { _eventPool } = _rely;
    console.log('_eventPool: ', _eventPool);
    Object.keys(_eventPool).forEach(_eventId => {
      if (_eventPool[_eventId] === null) return
      removeEventListener(_eventId);
    });
  };

  /**
   * 过滤键盘输入
   * filterKeyboardInput(domInput1, key => key === '1')
   * !IE10
   */

  const filterKeyboardInput = function (eventElement, filterFunction = () => true) {
    addEventListener(eventElement, "keypress", ev => {
      const key = String.fromCharCode(ev.charCode);
      if (!filterFunction(key)) ev.preventDefault();
    });

  };

  /**
   * 过滤粘贴
   * filterPaste(domInput1, key => key !== '1')
   * !IE10
   */

   const filterPaste = function (eventElement, filterFunction) {
     addEventListener(eventElement, "paste", ev => {
      const pasteValue =  ev.clipboardData.getData("text/plain");
      console.log('pasteValue: ', pasteValue);
      if (!filterFunction(pasteValue)) ev.preventDefault();
    });
  };

  /**
   * 异步forEach
   * await asyncForEach(arr, item => { }, {})
   * !IE8
   */

  const asyncForEach = function (array = [], process = () => { }, context = null) {
    return new Promise(resolve => {
      let index = 0;
      const fn = () => {
        const startTime = Date.now();

        do {
          const item = array[index]; // 取出下一个异步执行的参数
          process.call(context, item);
          index++;
          if (index >= array.length) resolve();
        } while (index < array.length && Date.now() - startTime < 16)

        if (index < array.length) requestAnimationFrame(fn);
      };
      fn();
    })
  };

  /**
   * 设置cookie
   * setCookie({'username':'303738305','password':{'qq':'123456','wx':'213424'}})
   * !IE8
   */

  const setCookie = function (options, timeoutDay = 0) {
    let date;
    let del;
    if (timeoutDay > 0) {
      date = new Date();
      date.setDate(date.getDate() + timeoutDay);
    } else if (timeoutDay === 0) {
      date = 0;
    } else if (timeoutDay < 0) {
      date = timeoutDay;
      del = '已过期';
    }

    Object.keys(options).forEach(key => {
      const value = options[key];
      let cookie = '';
      if (getType(value) === 'String') {
        cookie = value;
      } else {
        cookie = JSON.stringify(value);
      }
      document.cookie = `${encodeURIComponent(key)}=${del || encodeURIComponent(cookie)}; expires=${date}`;
    });
  };

  /**
   * 得到cookie
   * getCookie(["username"],["password","wx"])
   * !IE8
   */

  const getCookie = function (name) {
    const allCookie = document.cookie.split("; ");
    const cookieParse = {};
    allCookie.forEach(item => {
      const [key, value] = item.split('=');
      try {
        cookieParse[key] = JSON.parse(decodeURIComponent(value));
      } catch (err) {
        cookieParse[key] = decodeURIComponent(value);
      }
    });
    if (name) return cookieParse[name]
    return cookieParse
  };

  /**
   * 删除cookie(不能删除子cookie)
   * hagan.delCookie(["username"],["password"])
   * !IE8
   */

  const removeCookie = function (name) {
    const allCookie = getCookie();
    Object.keys(allCookie).forEach(key => {
      if (!name || name === key) setCookie({ [key]: '' }, -1);
    });
  };

  /**
   * 移除字符串首尾空格
   */

  const trim = function (string) {
    if (getType(string) === 'String') {
      return string.replace(/^\s+|\s+$/g, '');
    }
  };

  /**
   * 得到img.onload的尺寸信息
   * getImgSizeFromLoad(ev)
   */

  const getImgSizeFromLoad = function (eventLoad) {

    const width = eventLoad.target.width || eventLoad.path[0].width;
    const height = eventLoad.target.height || eventLoad.path[0].height;
    const scale = Math.round((width / height) * 100) / 100;

    return { width, height, scale }
  };

  /**
   * 统一移动端与pc端获取鼠标和手指位置方法
   */

  const getClientX = function (ev) {
    return ev.clientX || ev.changedTouches[0].clientX
  };

  /**
   * 统一移动端与pc端获取鼠标和手指位置方法
   */

  const getClientY = function (ev) {
    return ev.clientY || ev.changedTouches[0].clientY
  };

  /**
   * 得到鼠标或手指到页面顶部或左部的距离
   */

  const getPageX = function (ev) {
    return ev.pageX || ev.changedTouches[0].pageX
  };

  /**
   * 得到鼠标或手指到页面顶部或左部的距离
   */

  const getPageY = function (ev) {
    return ev.pageY || ev.changedTouches[0].pageY
  };

  /**
   * 类数组转为数组
   */

  const getArrayFromArrayLike = function (arrayLike) {
    return [...arrayLike]
  };

  /**
   * 阶乘函数
   */

  const factorial = function (number) {
    if (number === 0) return 1
    return number * hagan.factorial(number - 1)
  };

  /**
   * 缓存递归函数前一个计算结果供后续使用
   */

  const memoize = function (fnRecursion, oObj = {}) {
    return function (opt) {
      if (!oObj.hasOwnProperty(opt)) {
        oObj[opt] = fnRecursion(opt);
      }
      return oObj[opt];
    }
  };

  /**
   * 加减乘除
   */

  // 判断number是否为一个整数
  const isInteger = function (number) {
    return Math.floor(number) === number
  };

  // 四舍五入
  const toFixed = function (number, decimalLength = 0) {
    var times = Math.pow(10, decimalLength);
    var fixed = number * times + 0.5;
    return parseInt(fixed) / times
  };

  // 将一个浮点数转成整数，返回整数和倍数
  const toInteger = function (floatNumber) {
    const numberInfo = { times: 1, number: 0 };
    const isNegative = floatNumber < 0;
    if (isInteger(floatNumber)) {
      numberInfo.number = floatNumber;
      return numberInfo
    }
    const stringFloatNumber = String(floatNumber);
    const dotPosition = stringFloatNumber.indexOf('.');
    const length = stringFloatNumber.substr(dotPosition + 1).length;
    numberInfo.times = Math.pow(10, length);
    numberInfo.number = toFixed(Math.abs(floatNumber) * numberInfo.times);
    if (isNegative) numberInfo.number = -numberInfo.number;
    return numberInfo
  };

  // 加
  const add = function (number1, number2, decimalLength = 0) {
    const { number: num1, times: times1 } = toInteger(number1);
    const { number: num2, times: times2 } = toInteger(number2);
    const maxTimes = Math.max(times1, times2);
    let result;
    if (times1 === times2) result = (num1 + num2) / maxTimes;
    if (times1 > times2) result = (num1 + num2 * (times1 / times2)) / maxTimes;
    if (times1 < times2) result = (num1 * (times2 / times1) + num2) / maxTimes;
    return toFixed(result, decimalLength)
  };

  // 减
  const subtract = function (number1, number2, decimalLength = 0) {
    const { number: num1, times: times1 } = toInteger(number1);
    const { number: num2, times: times2 } = toInteger(number2);
    const maxTimes = Math.max(times1, times2);
    let result;
    if (times1 === times2) result = (num1 - num2) / maxTimes;
    if (times1 > times2) result = (num1 - num2 * (times1 / times2)) / maxTimes;
    if (times1 < times2) result = (num1 * (times2 / times1) - num2) / maxTimes;
    return toFixed(result, decimalLength)
  };

  // 乘
  const multiply = function (number1, number2, decimalLength = 0) {
    const { number: num1, times: times1 } = toInteger(number1);
    const { number: num2, times: times2 } = toInteger(number2);
    const result = (num1 * num2) / (times1 * times2);
    return toFixed(result, decimalLength)
  };

  // 除
  const divide = function (number1, number2, decimalLength = 0) {
    const { number: num1, times: times1 } = toInteger(number1);
    const { number: num2, times: times2 } = toInteger(number2);
    const result = (num1 / num2) * (times2 / times1);
    return toFixed(result, decimalLength)
  };

  var math = { add, subtract, multiply, divide, toFixed };

  /**
   * 
   */

  const hideDom = function (eventElement, time = 500) {
    return new Promise((resolve, reject) => {
      const _hideDomId = eventElement._hideDomId || Symbol('_hideDomId');
      if (!eventElement._hideDomId) {
        _rely._hideDom[_hideDomId] = {
          opacity: getStyle(eventElement, 'opacity'),
          display: getStyle(eventElement, 'display'),
          lock: false
        };
        eventElement._hideDomId = _hideDomId;
      }

      const { lock } = _rely._hideDom[_hideDomId];
      if (lock) return reject('lock is true')
      _rely._hideDom[_hideDomId].lock = true;

      const times = divide(time, 16); // 过渡多少次
      const item = divide(_rely._hideDom[_hideDomId].opacity, times, 8); // 每次应该减少多少
      const _timerId = setInterval(hide, 16);
      hide();
      function hide() {
        const opacity = getStyle(eventElement, 'opacity');
        eventElement.style.opacity = subtract(opacity, item, 8);
        if (eventElement.style.opacity <= 0) {
          eventElement.style.opacity = 0;
          eventElement.style.display = "none";
          _rely._hideDom[_hideDomId].lock = false;
          clearInterval(_timerId);
          resolve();
        }
      }
    })
  };

  /**
   * 
   */

  const showDom = function (eventElement, time = 500) {
    return new Promise((resolve, reject) => {
      const _hideDomId = eventElement._hideDomId;
      if (!_rely._hideDom[_hideDomId]) return reject('eventElement._hideDomId is not defined')

      const { lock } = _rely._hideDom[_hideDomId];
      if (lock) return reject('lock is true')
      _rely._hideDom[_hideDomId].lock = true;

      eventElement.style.display = _rely._hideDom[_hideDomId].display;

      const times = divide(time, 16); // 过渡多少次
      const item = divide(_rely._hideDom[_hideDomId].opacity, times, 8); // 每次应该增加多少
      const _timerId = setInterval(show, 16);
      show();
      function show() {
        const opacity = getStyle(eventElement, 'opacity');
        eventElement.style.opacity = add(opacity, item, 8);
        if (eventElement.style.opacity >= 1) {
          eventElement.style.opacity = 1;
          _rely._hideDom[_hideDomId].lock = false;
          clearInterval(_timerId);
          resolve();
        }
      }
    })
  };

  /**
   * 判断是否是竖屏
   */

  const isVerticalScreen = function () {
    const width = getWindowWidth$1();
    const height = getWindowHeight$1();
    return height > width
  };

  /**
   * 判断是否是手机号
   */

  const isPhoneNumber = function (number) {
    const regex = /^1\d{10}$/;
    return regex.test(number)
  };

  /**
   * 获取哈希值
   * getHash()
   * !IE8
   */

  const getHash = function (url) {
    return url.replace(/(.*)(\#)(.+)/, ($0, $1, $2, $3) => $3)
  };

  /**
   * 正确返回Unicode字符串的长度
   * 兼容:
   *    基本多文种平面 '韩'
   *    代理对 '𠮷'
   * 
   * 
   *    组合标记 'q̣̇' 'Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞'
   * 
   * 
   * 目前无法正确处理表情字符序列组合 '👨‍👩‍👧‍👦'之类的组合标记
   */


  const getStringLength = function (string) {
    const regex = /(\P{Mark})(\p{Mark}+)/gu;
    const str = string.replace(regex, ($0, $1, $2) => $1);
    return Array.from(str).length
  };

  /**
   * 反转字符串
   */

  const getReverseString = function (string) {
    return Array.from(string).reverse().join('')
  };

  /**
   * 根据Unicode码点获取字符串
   * getStringFromCodePoint(128169) // 💩
   */

  const getStringFromCodePoint = function (codePoint = 0) {
    return String.fromCodePoint(codePoint)
  };

  /**
   * 根据字符串获取Unicode码点
   * getCodePointFromString('💩') // 128169
   */

  const getCodePointFromString = function (string = '') {
    return string.codePointAt().toString(16)
  };

  /**
   * 浅拷贝
   */

  const getDeepCloneObject = function (object) {
    return Object.assign({}, object)
  };

  /**
   * 深拷贝
   */

  const getCloneObject = function (object) {
    return JSON.parse(JSON.stringify(object))
  };

  // import Stack from './Stack'
  // import decimalismTo from './decimalismTo'

  const hagan$1 = {
    _rely,
    addEventListener,
    getEventName,
    addTapEventListener,
    removeEventListener,
    removeAllEventListener,
    getOs: getOs$1,
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
    getVwFromDomPx: getRemFromDomPx$1,
    getStyle,
    getWindowWidth: getWindowWidth$1,
    getWindowHeight: getWindowHeight$1,
    getElementRectInfo,
    postWindow,
    getQueryStringFromParams,
    ajax,
    jsonp,
    getType,
    setInterval,
    clearInterval,
    getBase64FromImageUrl,
    getBase64String,
    addMouseWheelEventListener,
    removeMouseWheelEventListener,
    getKeyCode,
    beforeUnload,
    customRightMenu,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    removeDomElement,
    filterKeyboardInput,
    filterPaste,
    asyncForEach,
    setCookie,
    getCookie,
    removeCookie,
    trim,
    getBlobFromBase64,
    getImgSizeFromLoad,
    getClientX,
    getClientY,
    getPageX,
    getPageY,
    getArrayFromArrayLike,
    memoize,
    factorial,
    hideDom,
    showDom,
    isVerticalScreen,
    isPhoneNumber,
    getHash,
    math,
    getStringLength,
    getReverseString,
    getStringFromCodePoint,
    getCodePointFromString,
    getCloneObject: getDeepCloneObject,
    getDeepCloneObject: getCloneObject,
    // Stack,
    // decimalismTo
  };

  return hagan$1;

})));
