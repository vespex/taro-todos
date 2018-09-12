import Taro from '@tarojs/taro'

const store = {}

export function setStore (key, value) {
  store[key] = value
  Taro.setStorageSync(key, value)
}

export function getStore (key) {
  if (store[key]) {
    return store[key]
  } else {
    store[key] = Taro.getStorageSync(key)
    return store[key]
  }
}