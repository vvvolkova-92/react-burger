import {SET_CURRENT_INGREDIENT, IN_MODAL_OPEN_INGREDIENT_CARD} from '../types';
import { closeModal } from './modalAction';
import { ICurrentIngredient } from '../types/interfaces';
import { Dispatch } from 'redux';
import { TActions } from '../types/actions';

export function setCurrentIngredient (item: ICurrentIngredient | undefined ) {
  if (item === null) {
    return closeModal();
  }
  if (item !== undefined) {
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
        _id: item._id,
        price: item.price,
      });
      dispatch({
        type: IN_MODAL_OPEN_INGREDIENT_CARD,
        open: true,
      });
    }
  }
};
