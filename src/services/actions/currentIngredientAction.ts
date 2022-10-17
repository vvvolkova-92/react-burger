import {SET_CURRENT_INGREDIENT, IN_MODAL_OPEN_INGREDIENT_CARD} from '../types';
import { closeModal } from './modalAction';
import { ICurrentIngredient } from '../types/interfaces';
import { Dispatch } from 'redux';
import TActions from '../types/actions';

export function setCurrentIngredient (item: ICurrentIngredient) {
  if (item === null) {
    return closeModal();
  }
  return function (dispatch: Dispatch<TActions>) {
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
};
