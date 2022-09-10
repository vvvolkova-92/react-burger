import PropTypes from 'prop-types';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import style from './MenuItem.module.css';
import {useState} from "react";

function MenuItem ({icon, link, stylesComp, stylesText, title}) {
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

MenuItem.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.element,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  stylesComp: PropTypes.string,
  stylesText: PropTypes.string,
};


export default MenuItem