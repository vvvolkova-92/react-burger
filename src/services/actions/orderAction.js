import { ORDER_GET_ORDER_NUMBER_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, IN_MODAL_OPEN_ORDER_CARD} from '../types';
import {BASEURL} from '../../utils/constants';


export function openOrderModal () {
  return function (dispatch) {
    dispatch( {
      type: IN_MODAL_OPEN_ORDER_CARD, 
      open: true,
    })
  }
}

export function getOrderNumber (ingredients) {

  return function (dispatch) {
    ( async () => {
      try {
        const res = await fetch(`${BASEURL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'ingredients': ingredients,
        })
      });
      if (res.ok) {
        const result = await res.json();
        dispatch({
          type: ORDER_GET_ORDER_NUMBER_SUCCESS,
          order: result,
        });
        dispatch({
          type: IN_MODAL_OPEN_ORDER_CARD,
          open: true,
        });
      } 
    } 
    catch(error) {
        dispatch({
          type: ORDER_GET_ORDER_NUMBER_FAILURE,
          order: error,
        });
      }
    })();
  }
}
