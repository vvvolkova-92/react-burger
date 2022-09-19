import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {BrowserRouter, Route, Switch, NavLink, useHistory, useLocation} from 'react-router-dom';

import UserInfo from "../../components/UserInfo/UserInfo";
import UserOrders from "../../components/UserOrders/UserOrders";
// стили
import styles from './Profile.module.css';
import {userLogout} from "../../services/actions/authenticationAction";
import OrderDetailInFeed from "../../components/OrderDetailInFeed/OrderDetailInFeed";
import Modal from "../../components/Modal/Modal";
import { setCurrentOrderDetail } from "../../services/actions/orderAction";
import { getCookie } from "../../utils/constants";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from "../../services/types";
const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const closeOrderOrdermodal = useCallback (() => {
    dispatch(setCurrentOrderDetail(null));
    history.replace({ pathname: location?.state?.from }) || history.go(-2);
    // history.replace({ pathname: location?.state?.from || '/profile/orders'});
    console.log(history);
  }, [history]);

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


  return (
    <BrowserRouter>
      <div className={styles.block}>
        <div className={styles.block__profile + " mt-20"}>
          <ul className={styles.menu}>
            <li className={styles.block__link}>
              <NavLink
                to = '/profile'
                className={styles.link + ' text text_type_main-medium text_color_inactive'}
                activeClassName={'text text_type_main-medium ' + styles.linkActive}
                exact
              >
                { ' ' }
                <span>Профиль</span>
              </NavLink>
            </li>
            <li className={styles.block__link}>
              <NavLink
                to = '/profile/orders'
                className={styles.link + ' text text_type_main-medium text_color_inactive'}
                activeClassName={'text text_type_main-medium ' + styles.linkActive}
                exact>
                { ' ' }
                <span>История заказов</span>
              </NavLink>
            </li>
            <li className={styles.block__link}>
              <NavLink
                to = '/profile-exit'
                className={styles.link + ' text text_type_main-medium text_color_inactive'}
                activeClassName={'text text_type_main-medium ' + styles.linkActive}
                onClick={() => dispatch(userLogout(history))}
              >
                { ' ' }
                <span>Выход</span>
              </NavLink>
            </li>
            <p className={styles.text + " text text_type_main-default text_color_inactive mt-20"}>В этом разделе вы можете
              изменить свои персональные данные</p>
          </ul>
        </div>
        <div className={styles.block__details + " ml-15"}>

          <Switch >
            <Route path={`/profile/orders`} exact={true}>
              <UserOrders />
            </Route>
            <Route path={`/profile`} exact={true}>
              <UserInfo />
            </Route>
          </Switch>
          {!background && (
            <Route
              path={`/profile/orders/:id`}
              children={
                <Modal
                  closeModal={closeOrderOrdermodal}
                  orderModal
                  >
                  <OrderDetailInFeed/>
                </Modal>
              }
              exact
            >
            </Route>
          )}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Profile