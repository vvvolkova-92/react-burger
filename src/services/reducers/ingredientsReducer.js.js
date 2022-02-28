import {ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, ALL_GET_INGREDIENTS_FAILURE} from '../types';

export const initialState = {
  //список всех полученных ингредиентов
  ingredients: [],
  // //список всех ингредиентов в текущем конструкторе бургера
  // constructorIngredients: [],
  // //объект текущего просматриваемого ингредиента
  // currentIngredient: null,
  // //объект созданного заказа
  // order: {
  //   orderNumber: 0
  // },
  isFetching: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_GET_INGREDIENTS_REQUEST:
      return { 
        ...state,
        isFetching: true,
      }
    case ALL_GET_INGREDIENTS_SUCCESS:
      return { 
        ...state,
        isFetching: false,
        ingredients: action.ingredients,
      }
    default: return state
  }
}



