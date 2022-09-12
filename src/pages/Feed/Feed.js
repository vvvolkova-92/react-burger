import React from 'react';
import {BrowserRouter, Route, Switch, useHistory, useLocation} from 'react-router-dom';
//мои компоненты
import OrderInFeed from '../../components/OrderInFeed/OrderInFeed';
import OrderDetailInFeed  from '../../components/OrderDetailInFeed/OrderDetailInFeed';
import Modal from '../../components/Modal/Modal';
//стили
import style from './Feed.module.css';

const Complete = ({title, number}) => {
  return (
    <div className={`${style.complete} mt-15`}>
      <p className="text text text_type_main-medium">{title}</p>
      <span className={`${style.completeNumber} text text_type_digits-large`}>{number}</span>
    </div>
  )
};

export function Stat() {
  const dayTotal = 150;
  const dayTitle = 'Выполнено за сегодня:';
  const monthTitle = 'Выполнено за все время:';
  const monthTotal = 234123;

  return (
    <div className={style.stat}>
      <div className={style.orderStats}>
        <div className={style.orderDone}>
          <span className={`${style.statusTitle} text text_type_main-medium mb-4`}>Готовы:</span>
          <ul className={`${style.orderDoneList}`}>
            <li className="text text_type_digits-default mb-2">1111</li>
            <li className="text text_type_digits-default mb-2">2222</li>
            <li className="text text_type_digits-default mb-2">3333</li>
            <li className="text text_type_digits-default mb-2">4444</li>
            <li className="text text_type_digits-default mb-2">5555</li>
            <li className="text text_type_digits-default mb-2">6666</li>
          </ul>
        </div>
        <div className={style.orderInProgress}>
          <span className={`${style.statusTitle} text text_type_main-medium mb-4`}>В работе:</span>
          <ul className={`${style.orderInProgressList}`}>
          <li className="text text_type_digits-default mb-2">7777</li>
            <li className="text text_type_digits-default mb-2">8888</li>
            <li className="text text_type_digits-default mb-2">9999</li>
            <li className="text text_type_digits-default mb-2">10000</li>
          </ul>
        </div>
      </div>
      <Complete title={monthTitle} number={monthTotal} />
        <Complete title={dayTitle} number={dayTotal} />
    </div>
  )
};

function Feed() {
  const location = useLocation();
  const background = location.state && location.state.background;

  // const closeModal = useCallback (() => {
  //   dispatch(setCurrentIngredient(null));
  //   history.replace({ pathname: "/" });
  // }, [history]);

  const title = 'Лента заказов';
  return (
    <main className={style.container}>
      <h2 className={`text text_type_main-large mt-10 mb-5`}>{title}</h2>
      <div className={style.info}>
      <ul className={style.list}>
        <OrderInFeed location/>
        <OrderInFeed location/>
        <OrderInFeed location/>
        <OrderInFeed location/>
        <OrderInFeed location/>
        <OrderInFeed location/>
        <OrderInFeed location/>
      </ul>
      <Stat />
      </div>
      {background && (
            <Route
              path={`/ingredients/:id`}
              children={
                <Modal
                  // closeModal={closeModal}
                  >
                  <OrderDetailInFeed/>
                </Modal>
              }
            >
            </Route>
          )}
    </main>
  );
}

export default Feed;