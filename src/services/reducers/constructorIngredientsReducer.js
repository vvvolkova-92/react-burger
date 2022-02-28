import {IN_CONSTRUCTOR_GET_INGREDIENTS} from '../types';

export const initialState = {
  //список всех ингредиентов в текущем конструкторе бургера
  constructorIngredients: []
}

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    //временный вариант !!!!
    case IN_CONSTRUCTOR_GET_INGREDIENTS:
      return { 
        ...state,
        constructorIngredients: action.ingredients
      }
    default: return state
  }
}



