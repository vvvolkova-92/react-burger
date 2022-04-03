import { nanoid } from 'nanoid';
import styles from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import MenuItem from '../MenuItem/MenuItem';
import {useDispatch, useSelector} from 'react-redux';
function AppHeader () {
    const title = useSelector(state => state.title.title);
    return (
    <header className={styles.menuContainer}>
      <div className={styles.menu}>
        <ul className={styles.menuItems + " " + styles.flex}>
          <MenuItem 
          id={nanoid(10)}
          icon={<BurgerIcon type="primary" />}
          link={"#"}
          stylesComp={"mr-2 pl-5 pt-4 pr-5 pb-4 " + styles.flex}
          stylesText={"ml-2 text text_type_main-default text_color_primary " + styles.text}
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
          title={title}
          />
      </div>
    </header>

    );
  }

export default AppHeader 