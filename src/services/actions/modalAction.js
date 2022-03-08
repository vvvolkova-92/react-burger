import { IN_MODAL_OPEN_INGREDIENT_CARD, IN_MODAL_OPEN_ORDER_CARD, IN_MODAL_CLOSE_CARD} from '../types';

export function closeModal () {
  return function (dispatch) {
    dispatch({
      type: IN_MODAL_CLOSE_CARD,
    });
  }
}
