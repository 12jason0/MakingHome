import { combineReducers } from 'redux';
import heartReducer from './heartReducer'; // 내가 작성한걸로 바꿔줘야함
const rootReducer = combineReducers({
  // 이것도 마찬가지
  heartState: heartReducer,
});
export default rootReducer;
