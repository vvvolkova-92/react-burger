import { useCallback } from 'react';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber } from '../../services/actions/orderAction';
import {useHistory} from "react-router-dom";

function ButtonGetOrderNumber() {

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
        const postIngredients = main.concat(bun).map(item => {
          return item._id;
        })

        isLogin ? dispatch(getOrderNumber(postIngredients)) : history.replace({ pathname: "/login" });

      }
    },
    [bun, main],
  );

  const closeModal = () => {
    dispatch(getOrderNumber(null));
  }

  return ( <>
    <Button type="primary" size="large" onClick={clickHandler}>
      Оформить заказ
    </Button>
    {orderModal && (
      <Modal closeModal ={closeModal}>
        <OrderDetails />
      </Modal> ) 
    }
  </>
  )
}

export default ButtonGetOrderNumber 