import {ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, ALL_GET_INGREDIENTS_FAILURE} from '../types';
import { TActions } from '../types/actions';
import { TGetIngredientsState } from '../types/redusers';

export const initialState: TGetIngredientsState = {
  //список всех полученных ингредиентов
  ingredients: [],
  isFetching: false,
  total: null,
  ingredientsReady: false,
}

export const ingredientsReducer = (state = initialState, action: TActions): TGetIngredientsState => {
  switch (action.type) {
    case ALL_GET_INGREDIENTS_REQUEST:
      return { 
        ...state,
        isFetching: true,
        ingredientsReady: false,
      }
    case ALL_GET_INGREDIENTS_SUCCESS:
      return { 
        ...state,
        isFetching: false,
        ingredients: action.ingredients,
        ingredientsReady: true,
      }
      case ALL_GET_INGREDIENTS_FAILURE:
        return { 
          ...state,
          isFetching: true,
          ingredients: [],
          ingredientsReady: false,
        }
    default: return state
  }
}



