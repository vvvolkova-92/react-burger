import { ORDER_GET_ORDER_NUMBER_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, SET_CURRENT_HISTORY_ORDER } from '../types';
import { THistoryOrderState, TOrderState } from '../types/redusers';
import { TActions } from '../types/actions';

export const initialState: TOrderState = {
  //объект созданного заказа
  order: null,
};

export const historyOrderState: THistoryOrderState = {
  //объект текущего просматриваемого заказа
  name: '',
  number: undefined,
  status: undefined,
  ingredients: [],
  createdAt: undefined,
  totalPrice: null,
};

export const orderReducer = (state = initialState, action: TActions): TOrderState => {
  switch (action.type) {
    case ORDER_GET_ORDER_NUMBER_SUCCESS:
      return { 
        ...state,
        order: action.order,
      }
    case ORDER_GET_ORDER_NUMBER_FAILURE:
      return { 
        ...state,
        order: null,
      }
    default: return state
  }
};

export const currentOrderReducer = (state = historyOrderState, action: TActions): THistoryOrderState => {
  switch (action.type) {
    case SET_CURRENT_HISTORY_ORDER:
      return { 
        ...state,
        name: action.name,
        number: action.number,
        status: action.status,
        ingredients: action.ingredients,
        createdAt: action.createdAt,
      }
    // case TOTAL_PRICE_ORDER:
    //   return {
    //     ...state,
    //     totalPrice: action.total,
    //   }
    default: return state
  }
}



