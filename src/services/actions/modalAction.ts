import { AppDispatch } from '../types/index';
import {IN_MODAL_CLOSE_CARD, IN_CONSTRUCTOR_CLEAN} from '../types';

export function closeModal () {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: IN_MODAL_CLOSE_CARD,
    });
    dispatch({
      type: IN_CONSTRUCTOR_CLEAN,
      main: [],
      bun: null,
    });
  }
};
