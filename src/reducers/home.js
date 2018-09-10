import { LIST, DETAIL } from '../constants/home'

const INITIAL_STATE = {
  list: [],
  detail: {}
}

export default function home (state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case LIST:
      return {
        ...state,
        list: payload.list
      }
     case DETAIL:
       return {
         ...state,
         detail: payload.detail
       }
     default:
       return state
  }
}
