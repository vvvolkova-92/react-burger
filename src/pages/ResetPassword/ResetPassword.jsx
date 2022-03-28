import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import styles from './ResetPassword.module.css';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory} from 'react-router-dom';
import { INPUT_USER_PASSWORD, INPUT_VERIFICATION_CODE } from '../../services/types';
import InputPassword from "../../components/Inputs/InputPassword";
import { changePassword}  from '../../services/actions/authentication'

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { hasError, error } = useSelector((state) => state.ForgotPassword);
  const { userPassword, verificationCode } = useSelector((state) => state.inputData);
  const inputRef = useRef(null);
  
  // const onChangePasswordHandler = evt => {
  //   dispatch({
  //     type: INPUT_USER_PASSWORD,
  //     userPassword: evt.target.value,
  //   });
  // };

  const onChangeCodeHandler = evt => {
    dispatch({
      type: INPUT_VERIFICATION_CODE,
      verificationCode: evt.target.value,
    });
  };

  const changePass = () => {
    dispatch(changePassword(userPassword, verificationCode, history));
  }

  return ( 
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Восстановление пароля</h1>
        <form className={styles.form}>
            {/* <Input
              type={'password'}
              placeholder={'Введите новый пароль'}
              onChange={onChangePasswordHandler}
              icon={'ShowIcon'}
              value={userPassword}
              name={'password'}
              error={false}
              // onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            /> */}
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
        </form>
        <Button type="primary" size="medium" onClick={changePass}>Сохранить</Button>
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
