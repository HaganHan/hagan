class Promise {
  constructor(executor) {
    // 正在进行
    this.status = 'pending'
    // 成功的值
    this.success = undefined
    // 失败的值
    this.error = undefined

    // 储存成功的回调
    this.onfulfilledCallback = []

    // 储存失败的回调
    this.onrejectedCallback = []
    try {
      executor.call(this, this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  resolve (value) {
    if (this.status === 'pending') {
      this.status = 'fufilled'
      this.success = value
      this.onfulfilledCallback.forEach(onfulfilled => onfulfilled())
    }
  }
  reject (value) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.error = value
      this.onrejectedCallback.forEach(onrejected => onrejected())
    }
  }
  then (onfulfilled, onrejected) {
    return new Promise((resolve, reject) => {
      if (this.status === 'fufilled') {
        try {
          resolve(onfulfilled(this.success))
        } catch (err) {
          reject(err)
        }
      } else if (this.status === 'rejected') {
        try {
          if (onrejected instanceof Function) {
            resolve(onrejected(this.error))
          }
        } catch (err) {
          reject(err)
        }
      } else if (this.status === 'pending') {
        this.onfulfilledCallback.push(() => {
          try {
            resolve(onfulfilled(this.success))
          } catch (err) {
            reject(err)
          }
        })
        this.onrejectedCallback.push(() => {
          try {
            resolve(onrejected(this.error))
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
  catch (onrejected) {
    return this.then(() => {}, onrejected)
  }
}

Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let num = 0
    const result = []
    values.forEach((value, index) => {
      if (value instanceof Promise) {
        value.then.call(value, (res) => {
          result[index] = res
          num++
          if (num === values.length) resolve(result)
        }, err => {
          reject(err)
        })
      } else {
        result[index] = value
        num++
        if (num === values.length) resolve(result)
      }
    })
  })
}

export default Promise
