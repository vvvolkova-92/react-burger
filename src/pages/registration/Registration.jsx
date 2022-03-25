import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import styles from './Registration.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { userRegistration } from '../../services/actions/authentication';
import InputName from "../../components/Inputs/InputName";
import InputPassword from "../../components/Inputs/InputPassword";
import InputEmail from "../../components/Inputs/InputEmail";

 const Registration = () => {
  const { hasError, userData } = useSelector( state => state.userData);
  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.inputData);
  let history = useHistory();

  function onSubmit () {
    dispatch(userRegistration(inputData, history));
  };

  return (

    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Регистрация</h1>
        <form className={styles.form}>
            <InputName />
            <InputEmail placeholder={'Email'}/>
            <InputPassword />
        </form>
        <Button type="primary" size="medium" onClick={onSubmit}>Зарегистрироваться</Button>
      </div>
      <div className={styles.actions + ' text text_type_main-default text_color_inactive mt-20'}>
        <div className={styles.action}>
          <span>Уже зарегестрированы?</span>
          <Link
          to = '/login'
          className={styles.link}
          > 
          { ' ' }
          Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Registration
