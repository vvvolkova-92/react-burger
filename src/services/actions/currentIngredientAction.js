import { SET_CURRENT_INGREDIENT, IN_MODAL_OPEN_INGREDIENT_CARD } from '../types';
import { closeModal } from './modalAction';
export function setCurrentIngredient (item) {
  if (item === null) {
    return closeModal();
  }
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
    dispatch({
      type: IN_MODAL_OPEN_INGREDIENT_CARD,
      open: true,
    });
  }
}
