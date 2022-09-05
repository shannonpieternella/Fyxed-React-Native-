import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import appReducer from './app.reducer';
import Popupreducer from './popup.reducer';

const rootReducer = combineReducers({
  authReducer,
  appReducer,
  Popupreducer,

});

export default rootReducer;
