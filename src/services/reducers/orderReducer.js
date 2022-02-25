import {GET_ORDER_NUMBER} from '../types';
import {initialState} from './ingredientsReducer.js.js';

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER:
      return { ...state, orderNumber: action.orderNumber}
    default: return state
  }
}



