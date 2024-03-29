import {Link} from 'react-router-dom';
import { FC } from 'react';
//сторонние компоненты
import {BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
//сторонние библиотеки
import { nanoid } from 'nanoid';
//мои компоненты
import MenuItem from '../MenuItem/MenuItem';
import { useSelector } from '../../services/types/hooks';
//стили
import styles from './AppHeader.module.css';


const AppHeader: FC = () => {
  const { isLogin, userData } = useSelector(store => store.userReducer);
  return (
    <header className={styles.menuContainer}>
      <div className={styles.menu}>
        <ul className={styles.menuItems + " " + styles.flex}>
          <MenuItem
            id={nanoid(10)}
            icon={<BurgerIcon type="secondary" />}
            link={"/"}
            stylesComp={`mr-2 pl-5 pt-4 pr-5 pb-4 ${styles.flex}`}
            stylesText={`text text_type_main-default text_color_inactive ${styles.text} ${styles.menuItem}`}
            title={"Конструктор"}
          />
          <MenuItem
            id={nanoid(10)}
            icon={<ListIcon type="secondary" />}
            link={"/feed"}
            stylesComp={`pl-5 pt-4 pr-5 pb-4 ${styles.flex}`}
            stylesText={`text text_type_main-default text_color_inactive ${styles.text} ${styles.menuItem}`}
            title={"Лента заказов"}
          />
        </ul>
        <Link
          to={'/'}
          className={styles.logo}>
          <Logo />
        </Link>
        <MenuItem
          id={nanoid(10)}
          icon={<ProfileIcon type="secondary" />}
          link={"/profile"}
          stylesComp={`pl-5 pt-4 pr-5 pb-4 ${styles.flex}`}
          stylesText={`text text_type_main-default text_color_inactive ${styles.text} ${styles.menuItem}`}
          title={ (isLogin && userData !== null) ? userData.user.name : "Личный кабинет"}
        />
      </div>
    </header>
  );
}

export default AppHeader