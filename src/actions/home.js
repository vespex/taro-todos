import request from '../utils/request'
import {
  INIT,
  OPT,
  ADD,
  DEL,
} from '../constants/home'

export const init = (payload) => {
  return {
    type: INIT,
    payload
  }
}

export const opt = (payload) => {
  return {
    type: OPT,
    payload
  }
}

export const add = (payload) => {
  return {
    type: ADD,
    payload
  }
}

export const del = (payload) => {
  return {
    type: DEL,
    payload
  }
}

export function initData({type, id}) {
  return dispatch => {
    request(`/local/todos/${type}/${id || ''}`)
    .then(data => dispatch(init({type, id, data})))
  }
}

export function addData ({type, title, content, list_id}) {
  return dispatch => {
    request(`/local/todos/${type}/add`, {method: 'POST', data: { title, content, list_id }})
    .then(data => dispatch(add({type, data, })))
  }
}

export function delData ({type, id}) {
  return dispatch => {
    request(`/local/todos/${type}/del`, {method: 'POST', data: { id }})
    .then(() => dispatch(del({type, id})))
  }
}

export function optData ({type, id, key}) {
  return dispatch => {
    request(`/local/todos/${type}/opt`, {method: 'POST', data: { id, key }})
    .then(() => dispatch(opt({type, id, key})))
  }
}