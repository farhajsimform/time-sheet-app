import { combineReducers } from 'redux'
import common from './common'
import { CommonState } from 'store/actionTypes/common'

const appReducer = combineReducers({
  common,
})

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action)
}

export interface RootState {
  common: CommonState
}

export default rootReducer
