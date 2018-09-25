import Taro from '@tarojs/taro'

const isDev = process.env.NODE_ENV === 'development'

const hostConf = {
  'mock': 'https://www.easy-mock.com/mock/5b96128d7db69152d064760b/todos',
  'local': 'http://127.0.0.1:3030'
}

const urlFormat = (url) => {
  if (url.startsWith('/')) {
    const urlSplit = url.slice(1).split('/')[0]
    if (isDev && hostConf[urlSplit]) {
      return url.replace('/' + urlSplit, hostConf[urlSplit])
    }
  }
  return url
}


function parseStatus ({statusCode, errMsg, data}) {
  if (statusCode >= 200 && statusCode < 300) {
    return data
  }

  const err = new Error(errMsg)
  return err
}

function parseData (res) {
  if (res.status === 0) {
    return res.data
  }
  const err = new Error(res.errMsg)
  err.res = res
  return err
}

export default function request (url, options = {}) {
  const defaultHeader = {
    'content-type': 'application/json'
  }
  options.header = {
    ...defaultHeader,
    ...options.header
  }
  return Taro.request({
    url: urlFormat(url),
    ...options
  })
  .then(parseStatus)
  .then(parseData)
}

export function busyRequest () {
  let busy = false
  return (url, options) => {
    return new Promise((resolve, reject) => {
      if (!busy) {
        busy = true
        request(url, options)
          .then(data => {
            resolve(data)
            busy = false
          })
          .catch(err => {
            reject(err)
            busy = false
          })
      }
    })
  }
}

export function lazyRequest () {
  let timer = null
  return (url, options, time = 500) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        request(url, options)
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      }, time)
    })
  }
}
