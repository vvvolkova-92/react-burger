import {GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST} from '../types';

export const getIngredients = (data) => {
  return dispatch => {
    dispatch( 
      {
      type: GET_INGREDIENTS_REQUEST,
    });
    setTimeout(() => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
      });
    }, 1000);
  }
}