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
import {dontEditProfile, editProfile } from "../../services/actions/authenticationAction";

//стили
import styles from './UserInfo.module.css';


function UserInfo() {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userName, userEmail, userPassword } = useSelector((state) => state.inputReducer);
  const { error, hasError, userData } = useSelector((state) => state.userReducer);
  const isEditInfo = (userData.user.email !== userEmail) || (userData.user.name !== userName);

  const onClickCancel = () => {
    dispatch(dontEditProfile(userData));
  };

  const onClickSubmit = () => {
    dispatch(editProfile(userName, userEmail, userPassword));
  };
  const buttons = isEditInfo && (
    <>
      <div className="mt-6">
        <Button type="primary" size="medium" onClick={onClickSubmit}>Сохранить</Button>
      </div>
    <div className="mt-6">
      <Button type="primary" size="medium" onClick={onClickCancel}>Отмена</Button>
    </div>
    </>
  );
  return (
    <div className={styles.block__user_info + " mt-30"}>
      <form className={styles.form}>
        <InputName icon={'EditIcon'} type={'profile'}/>
        <InputEmail placeholder={'Логин/Почта'} icon={'EditIcon'} type={'profile'}/>
        <InputPassword/>
      </form>
      {buttons}
    </div>
  )
}

export default UserInfo