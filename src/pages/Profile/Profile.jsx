import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef} from "react";
import styles from './Profile.module.css';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserInfo from "../../components/UserInfo/UserInfo";
import { getUserData } from '../../services/actions/authentication';
const Profile = () => {
  getUserData();
  return ( 
  <Router>
    <div className={styles.block}>
      <div className={styles.block__profile + " mt-20"}>
        <ul className={styles.menu}>
          <li className={styles.block__link}>
            <NavLink
            onClick={() => {getUserData()}}
              to = '/profile'
              className={styles.link + ' text text_type_main-medium text_color_inactive'}
              activeClassName={'text text_type_main-medium ' + styles.linkActive}
            > 
              { ' ' }
              <span>Профиль</span>
            </NavLink>
          </li>
          <li className={styles.block__link}>
            <NavLink
              to = '/profile-orders'
              className={styles.link + ' text text_type_main-medium text_color_inactive'}
              activeClassName={'text text_type_main-medium ' + styles.linkActive}
            > 
              { ' ' }
              <span>История заказов</span>
            </NavLink>
          </li>
          <li className={styles.block__link}>
            <NavLink
              to = '/profile-exit'
              className={styles.link + ' text text_type_main-medium text_color_inactive'}
              activeClassName={'text text_type_main-medium ' + styles.linkActive}
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
        <Switch>
          <Route path={`/profile`}>
            <UserInfo />
          </Route>
          <Route path={`/profile/orders`}>
            {/* <UserOrders /> */}
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  )
}

export default Profile
