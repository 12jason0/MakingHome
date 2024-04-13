import axios from 'axios';
import { productItem } from './heartStateArray';
import { createSlice } from '@reduxjs/toolkit';
import { HeartState } from '../component/interface';
import { heartAdd, heartDel } from './heartStateApi';
// 액션 타입 정의
type ActionType = 'active_heart' | 'deactive_heart';

// 액션 객체 타입 정의
export interface Action {
  type: ActionType;
  title: string;
  heartStatus: boolean;
}

// heart(찜 목록) 상태 관리
const initialState: HeartState[] = productItem;

const heartSliceA = createSlice({
  name: 'heartStateA',
  initialState: initialState,
  reducers: {
    // 사용자 Heart(찜) 조회 : 각 사용자마다 다름
    // 1. 로그인 시, userList db에 heart 누른 목록 배열 형태로 뽑아옴
    // 2. React에 저장된 Store 와 userList 목록 비교하여 Store heart 상태 수정
    // 3. 나머지 heart 들은 false 로 두기
    userHeart: (state, action) => {
      return state.map((product) => {
        for (let i = 0; i < action.payload.titleArr.length; i++) {
          if (product.title === action.payload.titleArr[i].title) {
            return {
              ...product,
              heartStatus: true,
            };
          }
        }
        return { ...product, heartStatus: false };
      });
    },
    activeHeart: (state, action) => {
      return state.map((product) => {
        if (product.title === action.payload.title) {
          // 하트 활성화
          heartAdd(action.payload.title);
          return {
            ...product,
            heartStatus: true,
          };
        }
        return product;
      });
    },
    deactiveHeart: (state, action) => {
      return state.map((product) => {
        if (product.title === action.payload.title) {
          // 하트 비활성화
          heartDel(action.payload.title);
          return {
            ...product,
            heartStatus: false,
          };
        }
        return product;
      });
    },
  },
});

export const { userHeart, activeHeart, deactiveHeart } = heartSliceA.actions;

export default heartSliceA.reducer;
