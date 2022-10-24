import {IN_MODAL_OPEN_INGREDIENT_CARD, IN_MODAL_OPEN_ORDER_CARD, IN_MODAL_CLOSE_CARD, IN_MODAL_ACTIVE, IN_MODAL_OPEN_HISTORY_ORDER_CARD, GET_ORDER_INFO_SUCCESS, GET_ORDER_INFO_FAILURE} from '../types';
export const initialState = {
  ingredientCardModal: false,
  orderModal: false,
  historyOrderModal: false,
  closeModal: true,
  data: null,
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case IN_MODAL_OPEN_INGREDIENT_CARD:
      return {
        ...state,
        ingredientCardModal: action.open,
        orderModal: false,
        closeModal: false,
      }
    case IN_MODAL_OPEN_ORDER_CARD:
      return {
        ...state,
        ingredientCardModal: false,
        orderModal: action.open,
        closeModal: false,
      }
    case IN_MODAL_OPEN_HISTORY_ORDER_CARD:
      return {
        ...state,
        ingredientCardModal: false,
        orderModal: false,
        historyOrderModal: action.open,
        closeModal: false,
      }

    case GET_ORDER_INFO_SUCCESS: {
      return {
        ...state,
        data: action.order,
      };
    }
    case GET_ORDER_INFO_FAILURE: {
      return {
        ...state,
        error: action.order,
      };
    }      

    case IN_MODAL_CLOSE_CARD:
      return {
        ...state,
        ingredientCardModal: false,
        orderModal: false,
        historyOrderModal: false,
        closeModal: true,
      }
    default: return state
  }
};




