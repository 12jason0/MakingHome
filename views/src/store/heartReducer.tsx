import axios from 'axios';
import { productItem } from './types';
interface Product {
  title: string;
  heartStatus: boolean;
}

// 액션 타입 정의
type ActionType = 'active_heart' | 'deactive_heart';

// 액션 객체 타입 정의
interface Action {
  type: ActionType;
  title: string;
  heartStatus: boolean;
}

// heart 상태 활성화 시, product에 활성화된 아이템(title로 구분) 추가하는 방식
const initialState: Product[] = productItem;

const heartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'active_heart':
      return state.map((product) => {
        if (product.title === action.title) {
          // 하트 활성화
          return {
            ...product,
            heartStatus: true,
          };
        }
        return product;
      });

    case 'deactive_heart':
      return state.map((product) => {
        if (product.title === action.title) {
          // 하트 비활성화
          return {
            ...product,
            heartStatus: false,
          };
        }
        return product;
      });
    default:
      return state;
  }
};

export default heartReducer;
