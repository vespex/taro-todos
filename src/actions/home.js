import {
  INIT,
  DINIT,
  LIST,
  DETAIL,
  OPT,
  DOPT,
  ADD,
  DEL,
  DDEL,
} from '../constants/home'

export const init = (payload) => {
  return {
    type: INIT,
    payload
  }
}
export const detailInit = (payload) => {
  return {
    type: DINIT,
    payload
  }
}
export const list = (payload) => {
  return {
    type: LIST,
    payload
  }
}
export const detail = (payload) => {
  return {
    type: DETAIL,
    payload
  }
}
export const opt = (payload) => {
  return {
    type: OPT,
    payload
  }
}
export const detailOpt = (payload) => {
  return {
    type: DOPT,
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
export const detailDel = (payload) => {
  return {
    type: DDEL,
    payload
  }
}

export function getInit () {
  return dispatch => {
    dispatch(init())
  }
}