import { ORDER_GET_ORDER_NUMBER_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, IN_MODAL_OPEN_ORDER_CARD } from '../types';

export const initialState = {
  //объект созданного заказа
  order: null,
}

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
}



