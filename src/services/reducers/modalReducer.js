import {IN_MODAL_OPEN_INGREDIENT_CARD, IN_MODAL_OPEN_ORDER_CARD, IN_MODAL_CLOSE_CARD, IN_MODAL_ACTIVE} from '../types';

export const initialState = {
  ingredientCardModal: false,
  orderModal: false,
  closeModal: true,
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
    case IN_MODAL_CLOSE_CARD:
      return {
        ...state,
        ingredientCardModal: false,
        orderModal: false,
        closeModal: true,
      }
    default: return state
  }
};




