import mainReducer from './dashboard.js'
import userReducer from './user.js'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  mainData: mainReducer,
  userData: userReducer,
})

export default rootReducer;
