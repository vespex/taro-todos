import Taro from '@tarojs/taro'

export const baseUrl = process.env.NODE_ENV === 'development' ? 'https://www.easy-mock.com/mock/5b96128d7db69152d064760b/todos' : ''

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
    url: baseUrl + url,
    ...options
  })
  .then(parseStatus)
  .then(parseData)
}