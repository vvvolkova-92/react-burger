import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
//сторонние компоненты
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
//мои компоненты
import InputName from "../Inputs/InputName";
import InputEmail from "../Inputs/InputEmail";
import InputPassword from "../Inputs/InputPassword";
//вспомогательные функции
import {dontEditProfile, editProfile, getUserData} from "../../services/actions/authenticationAction";

//стили
import styles from './UserInfo.module.css';
import {getIngredients} from "../../services/actions/ingredientsAction";


function UserInfo() {

  const dispatch = useDispatch();
  const { userData, isLogin } = useSelector((state) => state.userReducer);
  const { userName, userEmail, userPassword } = useSelector((state) => state.inputReducer);
  // const isEditInfo = (userData.user.email !== userEmail) || (userData.user.name !== userName);

  useEffect( () => {
    dispatch(getUserData());
  }, []);

  const onClickCancel = () => {
    dispatch(dontEditProfile(userData));
  };

  const onSubmit = () => {
    if(userData.user.email !== userEmail)
    dispatch(editProfile(userName, userEmail, userPassword));
  };

  return (
    <div className={styles.block__user_info + " mt-30"}>
      {isLogin && (<>
        <form className={styles.form} onSubmit={onSubmit} id='profile'>
          <InputName icon={'EditIcon'} type={'profile'} value={userData.user.name}/>
          <InputEmail placeholder={'Логин/Почта'} icon={'EditIcon'} type={'profile'} value={userData.user.email}/>
          <InputPassword type={'profile'}/>
        </form>
        <div className="mt-6">
        <Button type="primary" size="medium" form='profile'>Сохранить</Button>
          {/*<Button type="primary" size="medium" onClick={onClickCancel}>Отмена</Button>*/}
        </div>
        </>
        )
      }
    </div>
  )
}

export default UserInfo