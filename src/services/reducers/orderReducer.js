import { ORDER_GET_ORDER_NUMBER_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, IN_MODAL_OPEN_ORDER_CARD, SET_CURRENT_HISTORY_ORDER, TOTAL_PRICE_ORDER } from '../types';

export const initialState = {
  //объект созданного заказа
  order: null,
};

export const historyOrderState = {
  //объект текущего просматриваемого заказа
  name: '',
  number: undefined,
  status: undefined,
  ingredients: [],
  createdAt: undefined,
  totalPrice: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_GET_ORDER_NUMBER_SUCCESS:
      return { 
        ...state,
        isFetching: false,
        order: action.order,
      }
    case ORDER_GET_ORDER_NUMBER_FAILURE:
      return { 
        ...state,
        order: null,
        isFetching: false,
      }
    default: return state
  }
};

export const currentOrderReducer = (state = historyOrderState, action) => {
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



