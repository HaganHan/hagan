const _rely = { // 所有的依赖信息
  _eventId: 0,
  _eventPool: {}, // 存着所有元素id绑定的事件函数
  _tapEventPool: {}, // tap事件封装所需的必要属性
  _rem: 0, // 存着html标签上的字体大小
  _timerId: 0,
  _timer: {}, // 存着模拟定时器的执行序列
  _mouseWheelId: 0,
  _mouseWheel: {}, // 存着所有绑定的滚轮事件
  hideDomInfo: {}, // 元素hide前的display状态
}

export default _rely