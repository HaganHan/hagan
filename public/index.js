import hagan from '../src/hagan'

const promise = new hagan.Promise((resolve, reject) => {
  setTimeout(() => {
    reject('hagan')
  }, 1000)
})
promise.catch((err) => {
  console.log('err: ', err)
})

const promise2 = promise.then((res) => {
  console.log('promise2 success: ', res)
}, (err) => {
  console.log('promise2 error:', err)
  return 'b'
})

const promise3 = promise2.then(res => {
  console.log('promise3 success: ', res)
  return 'c'
}, err => {
  console.log('promise3 error:', err)
  return 'd'
})

const promise4 = hagan.Promise.all([
  new hagan.Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1')
    }, 1000)
    // throw new Error('s')
  }),
  new hagan.Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2')
    }, 1500)
  }),
  3
])

promise4.then((res) => {
  console.log(res)
}, err => {
  console.log(err)
})

promise4.catch(err => {
  console.log(err)
})