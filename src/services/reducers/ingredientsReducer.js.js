import {GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST} from '../types';

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
  },
  isFetching: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { 
        ...state,
        isFetching: true,
      }
    case GET_INGREDIENTS_SUCCESS:
      return { 
        ...state,
        isFetching: false,
        // ingredients: state.ingredients,
      }
    default: return state
  }
}

// export async function fetchIngredients(dispatch, getState) {
//   const response = await client.get('/fakeApi/todos')
//   dispatch({ type: 'todos/todosLoaded', payload: response.todos })
// }



