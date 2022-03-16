import { ORDER_GET_ORDER_NUMBER_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, IN_MODAL_OPEN_ORDER_CARD} from '../types';
import {BASEURL} from '../../utils/constants';
import { closeModal } from './modalAction';
import { checkResponse } from '../../utils/constants';

export function getOrderNumber (ingredients) {
  if (ingredients === null) {
    return closeModal();
  }

  return async (dispatch) => {
      try {
        const res = await fetch(`${BASEURL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'ingredients': ingredients,
        })
      })
        .then (res => checkResponse(res))
        .then (res => {
          dispatch({
            type: ORDER_GET_ORDER_NUMBER_SUCCESS,
            order: res,
          });
          dispatch({
            type: IN_MODAL_OPEN_ORDER_CARD,
            open: true,
          });
        })
    } 
    catch(error) {
        dispatch({
          type: ORDER_GET_ORDER_NUMBER_FAILURE,
          order: error,
        });
      }
    };
}
