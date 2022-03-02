import { ORDER_GET_ORDER_NUMBER_REQUEST, ORDER_GET_ORDER_NUMBER_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE } from '../types';

export const initialState = {
  //объект созданного заказа
  order: null,
  isFetching: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_GET_ORDER_NUMBER_REQUEST:
      return { 
        ...state,
        isFetching: true,
      }
    case ORDER_GET_ORDER_NUMBER_SUCCESS:
      return { 
        ...state,
        isFetching: false,
        order: action.order,
      }
    case ORDER_GET_ORDER_NUMBER_FAILURE:
      return { 
        // дописать
      }
    default: return state
  }
}



