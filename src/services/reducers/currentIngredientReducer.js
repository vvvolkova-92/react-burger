import {GET_CURRENT_INGREDIENT} from '../types';
import {initialState} from './ingredientsReducer.js.js';

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_INGREDIENT:
      return { ...state}
    default: return state
  }
}



