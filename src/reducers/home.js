import { INIT, OPT, ADD, DEL } from '../constants/home'

const INITIAL_STATE = {
  list: [],
  detail: [],
}

const reducer = {
  [INIT] (state, { type, data }) {
    return {
      ...state,
      [type]: data
    }
  },
 
  [ADD] (state, { type, data }) {
    const list = state[type].slice()
    list.push(data)
    return {
      ...state,
      [type]: list,
    }
  },
  [DEL] (state, { type, id }) {
    const list = state[type].slice()
    list.splice(state[type].findIndex(item => item.id === id), 1)
    return {
      ...state,
      [type]: list,
    }
  },
  [OPT] (state, {type, id, key}) {
    console.log(key);
    const data = state[type].slice()
    let curOpt = data.find(item => item.id === id)
    console.log(curOpt);
    curOpt[key] = !curOpt[key]
    console.log(curOpt);
    return {
      ...state,
      [type]: data
    }
  },
}
export default function home (state = INITIAL_STATE, {type, payload}) {
  return reducer[type] ? reducer[type](state, payload) : state
}
