import {GET_INGREDIENTS_IN_CONSTRUCTOR} from '../types';
import {initialState} from './ingredientsReducer.js.js';

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_IN_CONSTRUCTOR:
      return { ...state}
    default: return state
  }
}



