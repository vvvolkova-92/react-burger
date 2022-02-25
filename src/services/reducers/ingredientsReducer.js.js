import {GET_INGREDIENTS} from '../types';

export const initialState = {
  //список всех полученных ингредиентов
  ingredients: [],
  //список всех ингредиентов в текущем конструкторе бургера
  constructorIngredients: [],
  //объект текущего просматриваемого ингредиента
  currentIngredient: null,
  //объект созданного заказа
  order: {
    orderNumber: 0
  }
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state}
    default: return state
  }
}



