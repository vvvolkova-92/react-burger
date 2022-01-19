import React from "react";
import { nanoid } from 'nanoid';
import styles from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import MenuItem from '../MenuItem/MenuItem';
function AppHeader () {
  const [current, setCurrent] = React.useState('one');
    return (
    <header className={styles.menuContainer}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        One
        </Tab>
      <div className={styles.menu}>
        <ul className={styles.menuItems + " " + styles.flex}>
          <MenuItem 
          id={nanoid(10)}
          icon={<BurgerIcon type="primary" />}
          link={"#"}
          stylesComp={"mr-2 pl-5 pt-4 pr-5 pb-4 " + styles.flex}
          stylesText={"ml-2 text text_type_main-default text_color_inactive " + styles.text}
          title={"Конструктор"}
          />
          <MenuItem 
          id={nanoid(10)}
          icon={<ListIcon type="secondary" />}
          link={"#"}
          stylesComp={"pl-5 pt-4 pr-5 pb-4 " + styles.flex}
          stylesText={"ml-2 text text_type_main-default text_color_inactive " + styles.text}
          title={"Лента заказов"}
          />
        </ul>
        <div className={styles.logo}>
        <Logo />
        </div>
        
        <MenuItem 
          id={nanoid(10)}
          icon={<ProfileIcon type="secondary" />}
          link={"#"}
          stylesComp={"pl-5 pt-4 pr-5 pb-4 " + styles.flex}
          stylesText={"ml-2 text text_type_main-default text_color_inactive " + styles.text}
          title={"Личный кабинет"}
          />
      </div>
    </header>

    );
  }

export default AppHeader 