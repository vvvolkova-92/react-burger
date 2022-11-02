import { FC } from 'react';
import {NavLink} from "react-router-dom";
import { IMenuItem } from '../../services/types/interfaces';
import style from './MenuItem.module.css';

const MenuItem: FC<IMenuItem> = ({icon, link, stylesComp, stylesText, title}) => {
  return (
    <li className={stylesComp}>
      <NavLink
        className={stylesText}
        activeClassName={style.linkActive}
        to={link}
        exact={true}
      >
        {icon}
        {' '}
        <span className="ml-2">{title}</span>
      </NavLink>
    </li>
  );
}

export default MenuItem