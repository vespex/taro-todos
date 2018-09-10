import {
  LIST,
  DETAIL
} from '../constants/home'
import request from '../utils/request'

export const list = (payload) => {
  return {
    type: LIST,
    payload
  }
}
export const detail = () => {
  return {
    type: DETAIL
  }
}

// 异步的action
export function getList () {
  return dispatch => {
    request('/list')
    .then(data => dispatch(list(data)))
  }
}
