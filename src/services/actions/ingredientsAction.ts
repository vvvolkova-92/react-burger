import {ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, ALL_GET_INGREDIENTS_FAILURE} from '../types';
import {BASEURL} from '../../utils/constants';
import { nanoid } from 'nanoid';
import { checkResponse } from '../../utils/constants';
import { Dispatch } from 'redux';
import TActions from '../types/actions';

interface Iingredient {
  key: string;
  counter: number;
  index: number;
}

export function getIngredients () {
  return function (dispatch: Dispatch<TActions>) {
    dispatch({
      type: ALL_GET_INGREDIENTS_REQUEST,
    });
    (async () => {
      try{
      const res = await fetch(`${BASEURL}/ingredients`)
        .then( res => checkResponse(res))
        .then( res => {
          const pushIngredient = res.data.map((ingredient: Iingredient) => {
            ingredient.key = nanoid(10);
            ingredient.counter = 0;
            ingredient.index = 0;
            return ingredient;
          })
        dispatch({
          type: ALL_GET_INGREDIENTS_SUCCESS,
          ingredients: pushIngredient,
        });
      })    
  } 
    catch(error) {
        dispatch({
          type: ALL_GET_INGREDIENTS_FAILURE,
        });
      }
    })();
  }
}
