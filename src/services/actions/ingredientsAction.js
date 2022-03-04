import {ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, ALL_GET_INGREDIENTS_FAILURE} from '../types';
import {BASEURL} from '../../utils/constants';
import { nanoid } from 'nanoid';
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
        const pushIngredient = result.data.map(ingredient => {
          ingredient.key = nanoid(10);
          ingredient.counter = 0;
          return ingredient;
        })
        console.log(pushIngredient);
        dispatch({
          type: ALL_GET_INGREDIENTS_SUCCESS,
          ingredients: pushIngredient,
        });
      } 
    } 
    catch(error) {
        // dispatch({
        //   //дописать!
        // });
      }
    })();
  }
}
