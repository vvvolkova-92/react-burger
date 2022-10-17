import {IN_MODAL_CLOSE_CARD, IN_CONSTRUCTOR_CLEAN} from '../types';
import { Dispatch } from 'redux';
import TActions from '../types/actions';

export function closeModal () {
  return function (dispatch: Dispatch<TActions>) {
    dispatch({
      type: IN_MODAL_CLOSE_CARD,
    });
    dispatch({
      type: IN_CONSTRUCTOR_CLEAN,
      main: [],
      bun: '',
    });
  }
};
