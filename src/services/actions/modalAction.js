import { IN_MODAL_CLOSE_CARD} from '../types';

export function closeModal () {
  return function (dispatch) {
    dispatch({
      type: IN_MODAL_CLOSE_CARD,
    });
  }
}
