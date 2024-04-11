import axios from 'axios';
import { productItem } from './types';
import { createSlice } from '@reduxjs/toolkit';
export interface Product {
  title: string;
  heartStatus: boolean;
}

// 액션 타입 정의
type ActionType = 'active_heart' | 'deactive_heart';

// 액션 객체 타입 정의
export interface Action {
  type: ActionType;
  title: string;
  heartStatus: boolean;
}

// heart(찜 목록) 상태 관리
const initialState: Product[] = productItem;

// createSlice를 써서 redux-persist 패키지 사용 성공
const heartSlice = createSlice({
  name: 'heartState',
  initialState: initialState,
  reducers: {
    activeHeart: (state, action) => {
      return state.map((product) => {
        if (product.title === action.payload.title) {
          // 하트 활성화
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

export const { activeHeart, deactiveHeart } = heartSlice.actions;

export default heartSlice.reducer;

// 실패한 코드
// const heartReducer = (state = initialState, action: Action) => {
//   switch (action.type) {
//     case 'active_heart':
//       return state.map((product) => {
//         if (product.title === action.title) {
//           // 하트 활성화
//           return {
//             ...product,
//             heartStatus: true,
//           };
//         }
//         return product;
//       });

//     case 'deactive_heart':
//       return state.map((product) => {
//         if (product.title === action.title) {
//           // 하트 비활성화
//           return {
//             ...product,
//             heartStatus: false,
//           };
//         }
//         return product;
//       });
//     default:
//       return state;
//   }
// };

// export default heartReducer;
