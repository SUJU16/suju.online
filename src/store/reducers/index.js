import { combineReducers } from 'redux'
import clusters from './clusters'
import preferences from './preferences'

const rootReducer = combineReducers({
  clusters,
  preferences
})

export default rootReducer
