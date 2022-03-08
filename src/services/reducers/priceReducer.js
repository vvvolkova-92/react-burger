import {TOTAL_PRICE} from '../types';

export const initialState = {
  //объект созданного заказа
  totalSum: null,
}

export const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOTAL_PRICE:
      return { 
        ...state,
        totalSum: action.totalSum,
      }
    default: return state
  }
}



