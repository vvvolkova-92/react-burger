import React from "react";
import { nanoid } from 'nanoid';
import styles from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import MenuItem from '../MenuItem/MenuItem';
function AppHeader () {

    return (
    <header className={styles.menuContainer}>
      <div className={styles.menu + " pt-4 pb-4"}>
        <ul className={styles.menuItems + " " + styles.flex}>
          <MenuItem 
          id={nanoid(5)}
          icon={<BurgerIcon type="primary" />}
          link={"#"}
          stylesComp={"mr-2 ml-5 " + styles.flex}
          stylesText={"ml-2 text text_type_main-default text_color_inactive " + styles.text}
          title={"Конструктор"}
          />
          <MenuItem 
          id={nanoid(5)}
          icon={<ListIcon type="secondary" />}
          link={"#"}
          stylesComp={"ml-5 " + styles.flex}
          stylesText={"ml-2 text text_type_main-default text_color_inactive " + styles.text}
          title={"Лента заказов"}
          />
        </ul>
        <div className={styles.logo}>
        <Logo />
        </div>
        
        <MenuItem 
          id={nanoid(5)}
          icon={<ProfileIcon type="secondary" />}
          link={"#"}
          stylesComp={"mr-5 " + styles.flex}
          stylesText={"ml-2 text text_type_main-default text_color_inactive " + styles.text}
          title={"Личный кабинет"}
          />
      </div>
    </header>

    );
  }

export default AppHeader 