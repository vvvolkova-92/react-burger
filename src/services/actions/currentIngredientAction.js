import { SET_CURRENT_INGREDIENT } from '../types';

export function setCurrentIngredient (item) {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      name: item.name,
      image: item.image,
      image_large: item.image_large,
      image_mobile: item.image_mobile,
      calories: item.calories,
      proteins: item.proteins,
      fat: item.fat,
      carbohydrates: item.carbohydrates,
    });
  }
}
