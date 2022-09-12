import React from 'react';
//мои компоненты
import OrderInFeed from '../OrderInFeed/OrderInFeed';
//стили
import style from './UserOrders.module.css';

function UserOrders() {
  return (
    <ul className={style.userOrderContainer}>
      <OrderInFeed status />
      <OrderInFeed status />
      <OrderInFeed status />
      <OrderInFeed status />
      <OrderInFeed status />
      <OrderInFeed status />
      <OrderInFeed status />

    </ul>
  )
}

export default UserOrders