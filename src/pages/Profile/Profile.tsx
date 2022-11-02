import { FC} from "react";
import { Route, Switch, NavLink, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import { useAppDispatch } from "../../services/types/hooks";
import UserInfo from "../../components/UserInfo/UserInfo";
import UserOrders from "../../components/UserOrders/UserOrders";
// стили
import styles from './Profile.module.css';
//экшены
import {userLogout} from "../../services/actions/authenticationAction";

export const ProfilePage: FC = () => {
  const { path } = useRouteMatch();
  return <Route path={`${path}`} exact><ProfileNav /></Route>
}

const ProfileNav: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<any>();
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
        <Switch >
          <Route exact path={`/profile`}>
            <UserInfo />
          </Route>
          <Route exact path={`/profile/orders`}>
            <UserOrders />
          </Route>
        </Switch>
        </div>
      </div>
  )
};