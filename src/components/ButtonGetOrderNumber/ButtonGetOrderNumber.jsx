import { useCallback, useState } from 'react';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber } from '../../services/actions/orderAction';
import {useHistory} from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner';

function ButtonGetOrderNumber() {
  const [state, setState] = useState(false);
  const { isLogin } = useSelector(store => store.userReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const { main, bun} = useSelector( store => ({
    main: store.constructorIngredients.main,
    bun: store.constructorIngredients.bun,
  })
  );
  const {orderModal} = useSelector(state => state.modalReducer);
  
  const clickHandler = useCallback (
    () => {
      if(bun && main) {
        const postIngredients = main.concat(bun).concat(bun).map(item => {
          return item._id;
        })
        console.log('postIngredients');
        isLogin ? dispatch(getOrderNumber(postIngredients)) : history.replace({ pathname: "/login" });
      }
      setState(true);
    },
    [bun, main],
  );
  const closeModal = () => {
    dispatch(getOrderNumber(null));
    setState(false);
  };

  return ( <>
    <Button type="primary" size="large" onClick={clickHandler}>
      Оформить заказ
    </Button>
    {state && (    
      <InfinitySpin 
        width='200'
        color="rgba(128, 26, 178, 1)"
      />)}
    {orderModal && (
      <Modal closeModal ={closeModal}>
        <OrderDetails />
      </Modal> ) 
    }
  </>
  )
}

export default ButtonGetOrderNumber 