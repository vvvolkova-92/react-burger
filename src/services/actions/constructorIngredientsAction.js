import {IN_CONSTRUCTOR_GET_INGREDIENTS, IN_CONSTRUCTOR_GET_INGREDIENTS_SUCCESS, IN_CONSTRUCTOR_GET_INGREDIENTS_FAILURE} from '../types';

export function getIngredientsInConstructor (ingredients) {
  const someIngredients = ingredients.slice(0,7);

  return function (dispatch) {
    dispatch({
      type: IN_CONSTRUCTOR_GET_INGREDIENTS,
      constructorIngredients: someIngredients,
    });
  }
}
