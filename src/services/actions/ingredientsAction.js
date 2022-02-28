import {ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, ALL_GET_INGREDIENTS_FAILURE} from '../types';
import {BASEURL} from '../../utils/constants';

export function getIngredients () {
  return function (dispatch) {
    dispatch({
      type: ALL_GET_INGREDIENTS_REQUEST,
    });
    (async () => {
      try{
      const res = await fetch(`${BASEURL}/ingredients`);
      if (res.ok) {
        const result = await res.json();
        dispatch({
          type: ALL_GET_INGREDIENTS_SUCCESS,
          ingredients: result.data,
        });
      } 
    } 
    catch(error) {
        dispatch({
          //дописать!
        });
      }
    })();
  }
}
