import { useSelector, useAppDispatch } from "../../services/types/hooks";
import { Link, useHistory} from 'react-router-dom';
import { FC } from "react";
//сторонние компоненты
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
//мои компоненты
import InputEmail from "../../components/Inputs/InputEmail";
// вспомоготельные функции
import {remindPassword} from "../../services/actions/authenticationAction";
import {getMessage} from "../../utils/constants";
// стили
import styles from './ForgotPassword.module.css';

const ForgotPassword:FC = () => {

  const dispatch = useAppDispatch();
  const history = useHistory();
  const email = useSelector(state => state.inputReducer.userEmail);
  const { result, sendLetter } = useSelector( state => state.ForgotPasswordReducer);
  const resultText = getMessage(result!.message!);

  const clickHandler = () => {
    dispatch(remindPassword(email, history));
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Восстановление пароля</h1>
        <div className={styles.form}>
          <InputEmail placeholder={'Укажите e-mail'}/>
        </div>
        <Button type="primary" size="medium" onClick={clickHandler}>Восстановить</Button>
      </div>
      {sendLetter && <span className={styles.result}>{resultText}</span>}
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