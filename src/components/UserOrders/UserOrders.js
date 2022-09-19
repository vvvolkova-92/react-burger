import React, { useCallback, useEffect, useMemo } from 'react';
import {BrowserRouter, Route, Switch, useHistory, useLocation, Link, useRouteMatch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
//мои компоненты
import OrderInFeed from '../OrderInFeed/OrderInFeed';
//стили
import style from './UserOrders.module.css';
import { ordersData } from '../../utils/constants';
import { setCurrentOrderDetail } from '../../services/actions/orderAction';
import Modal from '../Modal/Modal';
import OrderDetailInFeed from '../OrderDetailInFeed/OrderDetailInFeed';

function UserOrders() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { path, url } = useRouteMatch();
  const background = history.action === "PUSH";
  const orders = ordersData.orders;
  
  // useEffect( () => {
  //   dispatch(getIngredients());
  // }, [dispatch]);

  // const closeModal = useCallback (() => {
  //   dispatch(setCurrentOrderDetail(null));
  //   history.replace({ pathname: "/" });
  // }, [history]);

  const onClickCard = evt => {
    const currentOrder = orders.find((order) => order._id === evt.currentTarget.id);
    dispatch(setCurrentOrderDetail(currentOrder));
    history.push(`${path}/${currentOrder._id}`);
  };

  const closeOrderOrdermodal = useCallback (() => {
    dispatch(setCurrentOrderDetail(null));
    history.replace({ pathname: location?.state?.from || '/profile/orders' });
  }, [history]);


  const order = useMemo( () => orders.map(order => {
    return (
      <Link to={{
        pathname: `${path}/${order._id}`,
        state: { background: location },
      }}
      key={order._id}
      className={style.link}
      >
        <OrderInFeed {...order} onClick={onClickCard}/>
      </Link>
    )
  }),[orders]);

  return (
    <ul className={style.userOrderContainer}>
      {order}
    </ul>
  )
}

export default UserOrders