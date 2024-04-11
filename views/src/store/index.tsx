import { Action, Reducer, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import heartReducer, { Product } from './heartReducer';

import { PersistPartial } from 'redux-persist/es/persistReducer';

// RootState에서 heartState를 Partial로 선언
interface RootState {
  heartState: Product[];
}

const persistConfig = {
  key: 'root', // localStorage key
  storage, // localStorage
  whitelist: ['heartState'],
};

const rootReducer = combineReducers({
  heartState: heartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
