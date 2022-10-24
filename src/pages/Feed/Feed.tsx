import React, { FC, useEffect, useMemo } from 'react';
import { useHistory, useLocation, Link} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useSelector } from '../../services/types/hooks';
//мои компоненты
import OrderInFeed from '../../components/OrderInFeed/OrderInFeed';
import { setCurrentOrderDetail } from '../../services/actions/orderAction';
//стили
import style from './Feed.module.css';
//конастанты
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/types';
import { ILocationState, TComplete, IOrder, IWebSocketMessages } from '../../services/types/interfaces';

const Complete: FC<TComplete> = ({title, number}) => {
  return (
    <div className={`${style.complete} mt-15`}>
      <p className="text text text_type_main-medium">{title}</p>
      <span className={`${style.completeNumber} text text_type_digits-large`}>{number}</span>
    </div>
  )
};

export const Stat:FC<IWebSocketMessages> = ({orders, total, totalToday}) => {
  const dayTitle = 'Выполнено за сегодня:';
  const monthTitle = 'Выполнено за все время:';
  const ordersDone = useMemo(() => orders?.filter((order:IOrder) => order.status === 'done'),[orders]);
  const ordersInProgress = useMemo(() => orders?.filter((order: IOrder) => order.status === 'pending'),[orders]);
  return (
    <div className={style.stat}>
      <div className={style.orderStats}>
        <div className={style.orderDone}>
          <span className={`${style.statusTitle} text text_type_main-medium mb-4`}>Готовы:</span>
          <ul className={`${style.orderDoneList}`}>
            {ordersDone?.map((order:IOrder) => (<li className="text text_type_digits-default mb-2" key={order.number}>{order.number}</li>))}
          </ul>
        </div>
        <div className={style.orderInProgress}>
          <span className={`${style.statusTitle} text text_type_main-medium mb-4`}>В работе:</span>
          <ul className={`${style.orderInProgressList}`}>
          {ordersInProgress?.map((order: IOrder) => (<li className="text text_type_digits-default mb-2" key={order.number}>{order.number}</li>))}
          </ul>
        </div>
      </div>
      <Complete title={monthTitle} number={total} />
      <Complete title={dayTitle} number={totalToday} />
    </div>
  )
};

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: "wss://norma.nomoreparties.space/orders/all",
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, [dispatch]);

  
  // const { orders, total, totalToday } = useSelector((state) => state.socketReducer.messages);
  const { messages } = useSelector((state) => state.socketReducer);
  const orders = messages?.orders;
  const onClickCard = (order: IOrder, evt: React.ChangeEvent<HTMLElement>) => {
    const currentOrder = orders!.find((order: IOrder) => order._id === evt.currentTarget.id);
    dispatch(setCurrentOrderDetail(currentOrder!));
    history.push(`/feed/${order._id}`);
  }
  const title = 'Лента заказов';

  const order = useMemo(() => orders?.map((order: any) => {
    return (
      <Link to={{
        pathname: `/feed/${order._id}`,
        state: { background: location },
      }}
      key={order._id}
      className={style.link}
      >
        <OrderInFeed {...order} onClick={(evt) => onClickCard(order, evt)} inProfile/>
      </Link>
    )
  }),[orders]);
  return <main className={style.container}>
      <h2 className={`text text_type_main-large mt-10 mb-5`}>{title}</h2>
      <div className={style.info}>
      <ul className={style.list}>
        {order}
      </ul>
      <Stat {...messages!}/>
      </div>
    </main>
};

export default Feed;