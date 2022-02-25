import {GET_INGREDIENTS} from '../types';
import {BASEURL} from '../../utils/constants';


export function getIngredients(ingredient) {
  return async dispatch => {
    const res = await fetch(`${BASEURL}/ingredients`);
    const json = res.json();
    dispatch( {type: GET_INGREDIENTS, payload: json})
  }
}