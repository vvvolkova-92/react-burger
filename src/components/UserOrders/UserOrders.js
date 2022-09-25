import { useCallback, useMemo, useEffect } from 'react';
import { useHistory, useLocation, Link, useRouteMatch, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//мои компоненты
import OrderInFeed from '../OrderInFeed/OrderInFeed';
import { setCurrentOrderDetail } from '../../services/actions/orderAction';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/types';
import OrderDetailInFeed from '../OrderDetailInFeed/OrderDetailInFeed';
import Modal from '../Modal/Modal';

//стили
import style from './UserOrders.module.css';
import { getCookie } from '../../utils/constants';

function UserOrders() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { path } = useRouteMatch();
  const background = history.action === "PUSH";
  const { messages, wsConnected } = useSelector((state) => state.socketReducer);
  const { orders } = messages; 

  const onClickCard = useCallback((evt) => {
    const currentOrder = orders.find((order) => order._id === evt.currentTarget.id);
    dispatch(setCurrentOrderDetail(currentOrder));
    history.push(`${path}/${currentOrder._id}`);
  },[dispatch, history, orders, path]);

  const order = useMemo( () => orders?.map(order => {
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
  }),[orders, location, path, onClickCard]);

  return  <ul className={style.userOrderContainer}>
      {order}
    </ul>
}

export default UserOrders