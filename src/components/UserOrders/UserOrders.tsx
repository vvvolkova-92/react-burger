import { useCallback, useMemo, useEffect, FC } from 'react';
import { useHistory, useLocation, Link, useRouteMatch} from 'react-router-dom';
import { useSelector, useAppDispatch } from '../../services/types/hooks';
//мои компоненты
import OrderInFeed from '../OrderInFeed/OrderInFeed';
import { setCurrentOrderDetail } from '../../services/actions/orderAction';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/types';
import { getCookie } from '../../utils/constants';
//стили
import style from './UserOrders.module.css';
import { ILocationState } from '../../services/types/interfaces';

const UserOrders = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const { path } = useRouteMatch();
  const { userOrder, getUserOrders } = useSelector((state) => state.socketReducer);
  const orders = userOrder?.orders; 
  // const background = history.action === "PUSH" && location.state && location.state.background;
  // const { isLogin } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `wss://norma.nomoreparties.space/orders?token=${getCookie(
          'accessToken')}`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, []);
  const onClickCard = useCallback((evt: React.ChangeEvent<HTMLElement>) => {
    const currentOrder = orders!.find((order) => order._id === evt.currentTarget.id);
    setCurrentOrderDetail(currentOrder!);
    history.push(`${path}/${currentOrder!._id}`);
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
  }),[orders]);
  
  const userOrders = getUserOrders ? <ul className={style.userOrderContainer}>{order}</ul> : null;
  return userOrders;
}

export default UserOrders