import {GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST} from '../types';
import {BASEURL} from '../../utils/constants';

export function getIngredients () {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    // (async () => {
    //   const res = await fetch(`${BASEURL}/ingredients`);
    //   if (res.ok) {
    //     const result = res.json();
    //     dispatch({
    //       type: GET_INGREDIENTS_SUCCESS,
    //       ingredients: result,
    //     })
    //   } 
    // }
    (async () => {
      try{
      const res = await fetch(`${BASEURL}/ingredients`);
      if (res.ok) {
        const result = await res.json();
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: result.data,
        });
      } 
    } catch(error) {
        dispatch({
          //дописать!
        });
      }
    })();
  }
}
