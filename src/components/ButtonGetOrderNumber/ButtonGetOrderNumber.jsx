import {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {BASEURL}  from '../../utils/constants';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {propTypesForIngridients} from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber, openOrderModal } from '../../services/actions/orderAction';

function ButtonGetOrderNumber() {
  const dispatch = useDispatch();
  
  const { main, bun} = useSelector( store => ({
    main: store.constructorIngredients.main,
    bun: store.constructorIngredients.bun,
  })
  );

  const {order} = useSelector(store => store.orderReducer)

  const clickHandler = useCallback (
    () => {
      if(bun && main) {
        const postIngredients = main.concat(bun).map(item => {
          return item._id;
        })
        dispatch(getOrderNumber(postIngredients));
      }
    },
    [bun, main],
  );

  const closeHandler = useCallback(
    () => dispatch(getOrderNumber(null)),
    [dispatch],
  );

  return ( <>
    <Button type="primary" size="large" onClick={clickHandler}>
      Оформить заказ
    </Button>
    {/* {order != null && (
      <Modal onClose ={closeHandler}>
        <OrderDetails />
      </Modal> ) 
    } */}
  </>
  )
}

export default ButtonGetOrderNumber 