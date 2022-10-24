import { ORDER_GET_ORDER_NUMBER_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, IN_MODAL_OPEN_ORDER_CARD, IN_MODAL_OPEN_HISTORY_ORDER_CARD, SET_CURRENT_HISTORY_ORDER, TOTAL_PRICE_ORDER, GET_ORDER_INFO_SUCCESS, GET_ORDER_INFO_FAILURE} from '../types';
import {BASEURL} from '../../utils/constants';
import { closeModal } from './modalAction';
import { checkResponse } from '../../utils/constants';
import { getCookie } from '../../utils/constants';
import { Dispatch } from 'redux';
import { TActions } from '../types/actions';
import { IOrder } from '../types/interfaces';

export function getOrderNumber (ingredients: string[] | null) {
  if (ingredients === null) {
    return closeModal();
  };

  return async (dispatch: Dispatch<TActions>) => {
      try {
        const res = await fetch(`${BASEURL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + getCookie('accessToken'),
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
    catch(error: any) {
        dispatch({
          type: ORDER_GET_ORDER_NUMBER_FAILURE,
          order: error,
        });
      }
    };
};

export function getOrder(url: string) {
  return async (dispatch: Dispatch<TActions>) => {
      try {
        const res = await fetch(`${BASEURL}${url}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + getCookie('accessToken'),
          },
        })
        .then (res => checkResponse(res))
        .then (res => {
          console.log(res.orders);
          const { orders } = res;
          dispatch({
            type: GET_ORDER_INFO_SUCCESS,
            order: orders,
          });
        })
    } 
    catch(error: any) {
      console.log(error)
        dispatch({
          type: GET_ORDER_INFO_FAILURE,
          order: error,
        });
      }
    };
};


export function setCurrentOrderDetail (item: IOrder | undefined) {
  if (item === undefined) {
    return closeModal();
  }
  return function (dispatch: Dispatch<TActions>) {
    dispatch({
      type: SET_CURRENT_HISTORY_ORDER,
      name: item.name,
      number: item.number,
      status: item.status,
      ingredients: item.ingredients,
      createdAt: item.createdAt,
    });
    dispatch({
      type: IN_MODAL_OPEN_HISTORY_ORDER_CARD,
      open: true,
    });
  }
};

