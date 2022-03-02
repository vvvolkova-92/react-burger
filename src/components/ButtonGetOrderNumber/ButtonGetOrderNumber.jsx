import {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {BASEURL}  from '../../utils/constants';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {propTypesForIngridients} from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber, openOrderModal } from '../../services/actions/orderAction';

function ButtonGetOrderNumber({ingredients}) {

  // const [order, setOrder] = useState(false);
  // const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const orderNumber = useSelector( store => store.orderReducer.order);
  const postIngredients = ingredients.map (item => {
    return item._id;
  });

    const clickHandler = useCallback (
      () => {
        dispatch(getOrderNumber(postIngredients));
      },
      [postIngredients, dispatch],
    );

  return ( <>
    <Button type="primary" size="large" onClick={clickHandler}>
      Оформить заказ
    </Button>
    {orderNumber != null && (
      <Modal>
        <OrderDetails orderNumber={String(orderNumber.order.number)}/>
      </Modal> ) 
    }
  </>
  )
}

ButtonGetOrderNumber.propTypes = {
  ingredients: PropTypes.arrayOf(propTypesForIngridients),
};


export default ButtonGetOrderNumber 