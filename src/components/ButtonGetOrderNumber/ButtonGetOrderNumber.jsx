import {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {BASEURL}  from '../../utils/constants';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {propTypesForIngridients} from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber, openOrderModal } from '../../services/actions/orderAction';

function ButtonGetOrderNumber({bun, main}) {

  // const [order, setOrder] = useState(false);
  // const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const orderNumber = useSelector( store => store.orderReducer.order);
    const clickHandler = useCallback (
      () => {
        if(bun && main) {
          const postIngredients = bun.concat(main).map(item => {
            return item._id;
          })
          dispatch(getOrderNumber(postIngredients));
        }
      },
      [bun, main, dispatch],
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

// ButtonGetOrderNumber.propTypes = {
//   ingredients: PropTypes.arrayOf(propTypesForIngridients),
// };


export default ButtonGetOrderNumber 