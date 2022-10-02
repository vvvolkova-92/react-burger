import { useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter, Route, Switch, NavLink, useHistory, useLocation, useRouteMatch , Redirect} from 'react-router-dom';

import UserInfo from "../../components/UserInfo/UserInfo";
import UserOrders from "../../components/UserOrders/UserOrders";
// стили
import styles from './Profile.module.css';
import {userLogout} from "../../services/actions/authenticationAction";
import { setCurrentOrderDetail } from "../../services/actions/orderAction";
import { getCookie } from "../../utils/constants";
import OrderDetailInFeed from "../../components/OrderDetailInFeed/OrderDetailInFeed";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from "../../services/types";
import Modal from "../../components/Modal/Modal";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { path } = useRouteMatch();
  const background = history.action === "PUSH" && location.state && location.state.background;
  const closeOrderOrdermodal = useCallback (() => {
    dispatch(setCurrentOrderDetail(null));
    history.replace({ pathname: location?.state?.from || '/profile/orders'});
  }, []);
  return (
    <>
    {/* <Route path={`/profile/orders/:id`} component={OrderDetailInFeed} exact/> */}
    <Route path={`${path}`} component={ProfileNav} exact/>
    </>
)
}

export const ProfileNav = () => {
  const isLogin = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = history.action === "PUSH" && location.state && location.state.background;
  return (
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
        <Switch background={background || location }>
          <Route exact path={`/profile`} component={UserInfo} />
          <Route exact path={`/profile/orders`} component={UserOrders}/>
        </Switch>
        </div>
      </div>
  )
};