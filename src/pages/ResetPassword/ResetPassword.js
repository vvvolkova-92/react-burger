import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory} from 'react-router-dom';
// сторонние компоненты
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
//мои компоненты
import InputPassword from "../../components/Inputs/InputPassword";
// вспомогательные функции
import {changePassword, verifity} from "../../services/actions/authenticationAction";
// стили
import styles from './ResetPassword.module.css';
import {getMessage} from "../../utils/constants";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { hasError, error, result } = useSelector((state) => state.ForgotPasswordReducer);
  const { userPassword, verificationCode } = useSelector((state) => state.inputReducer);
  const inputRef = useRef(null);
  const errorText = getMessage(error);
  const successText = getMessage(result.message);

  const onChangeCodeHandler = evt => {
    dispatch(verifity(evt));
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    dispatch(changePassword(userPassword, verificationCode, history));
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <InputPassword />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChangeCodeHandler}
            value={verificationCode}
            name={'email'}
            error={false}
            // onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button type="primary" size="medium">Изменить</Button>
        </form>
        {hasError && <span className={styles.error}>{errorText}</span>}
        {result && <span className={styles.error}>{successText}</span>}
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

export default ResetPassword