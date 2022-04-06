import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import styles from './MenuItem.module.css';

function MenuItem ({icon, link, stylesComp, stylesText, title}) {

    return (
      <li className={stylesComp}>
        <NavLink
          exact
          activeClassName={styles.activeLink}
          to={{ pathname: link }} 
          className={stylesComp}
          >
            {icon}
            <p className={stylesText}>{title}</p>
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