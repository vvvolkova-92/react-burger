import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import styles from './ForgotPassword.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory} from 'react-router-dom';
import InputEmail from "../../components/Inputs/InputEmail";
import { remindPassword } from '../../services/actions/authentication';
const ForgotPassword = () => {
  const email = useSelector(state => state.inputData.userEmail);
  const { hasError, error} = useSelector( state => state.ForgotPassword);
  const dispatch = useDispatch();
  const history = useHistory();

  const clickHandler = () => {
    dispatch(remindPassword(email, history));
  }
  return ( 
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Восстановление пароля</h1>
        <div className={styles.form}>
            <InputEmail placeholder={'Укажите e-mail'}/>
        </div>
        <Button type="primary" size="medium" onClick={clickHandler}>Восстановить</Button>
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

export default ForgotPassword
