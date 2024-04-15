import { Action, Reducer, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import heartReducer from './heartReducer';

const persistConfig = {
  key: 'root', // localStorage key
  storage, // localStorage
  whitelist: ['heartStateA'],
};

const rootReducer = combineReducers({
  heartStateA: heartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
