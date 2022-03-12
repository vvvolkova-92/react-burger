import {IN_MODAL_CLOSE_CARD, IN_CONSTRUCTOR_CLEAN} from '../types';

export function closeModal () {
  return function (dispatch) {
    dispatch({
      type: IN_MODAL_CLOSE_CARD,
    });
    dispatch({
      type: IN_CONSTRUCTOR_CLEAN,
      main: [],
      bun: '',
    });
  }
}
