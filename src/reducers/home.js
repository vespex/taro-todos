import { INIT, DINIT, OPT, DOPT, ADD, DEL, DDEL } from '../constants/home'
import {setStore, getStore} from '../utils/store'

const options = [{name: 'star', value: false}]

const INITIAL_STATE = {
  list: [],
  detail: [],
  detailId: null,
  detailItem: {},
}

const reducer = {
  [INIT] (state) {
    return {
      ...state,
      list: getStore('list') || [],
      detail: getStore('detail') || []
    }
  },
  [DINIT] (state, payload) {
    const detailItem = state.detail.find(item => item.id === payload.id) || {}
    return {
      ...state,
      detailId: payload.id,
      detailItem
    }
  },
  [ADD] (state, payload) {
    const list = state.list.slice()
    const detail = state.detail.slice()
    const newId = `${state.list.length}-${+new Date()}-${parseInt(Math.random() * 10000)}`
    const {id, title, content} = payload
    if (!(list.find(item => item.id === id))) {
      list.push({
        id: newId,
        title,
        options
      })
    }
    const listOpt = { id: newId + parseInt(Math.random() * 100000), content, options }
    if (id) {
      content && detail.find(item => item.id === id).list.push(listOpt)
    } else {
      detail.push({
        id: newId,
        title,
        list: content ? [listOpt] : []
      })
    }
    setStore('list', list)
    setStore('detail', detail)
    return {
      ...state,
      list,
      detail
    }
  },
  [DEL] (state, payload) {
    const list = state.list.slice()
    const detail = state.detail.slice()
    const listIndex = list.findIndex(item => item.id === payload.id)
    const detailIndex = detail.findIndex(item => item.id === payload.id)

    listIndex !== -1 && list.splice(listIndex, 1)
    detailIndex !== -1 && detail.splice(detailIndex, 1)
    setStore('list', list)
    setStore('detail', detail)
    return {
      ...state,
      list,
      detail
    }
  },
  [OPT] (state, payload) {
    const data = state.list.slice()
    const card = data.find(item => item.id === payload.id)
    const opt = card.options && card.options.find(item => item.name === payload.name)
    opt && (opt.value = !payload.value)
    setStore('list', data)
    return {
      ...state,
      list: data
    }
  },
  [DDEL] (state, payload) {
    const detail = state.detail.slice()
    const list = detail.find(item => item.id === state.detailId).list
    const listIndex = list.findIndex(item => item.id === payload.id)
    console.log(listIndex, payload.id);
    listIndex !== -1 && list.splice(listIndex, 1)
    setStore('detail', detail)
    return {
      ...state,
      detail
    }
  },
  [DOPT] (state, payload) {
    const detail = state.detail.slice()
    const list = detail.find(item => item.id === state.detailId).list
    const listItem = list.find(item => item.id === payload.id)
    const opt = listItem.options && listItem.options.find(item => item.name === payload.name)
    opt && (opt.value = !payload.value)
    setStore('detail', detail)
    return {
      ...state,
      detail
    }
  },
}
export default function home (state = INITIAL_STATE, {type, payload}) {
  return reducer[type] ? reducer[type](state, payload) : state
}
