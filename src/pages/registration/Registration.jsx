import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import styles from './Registration.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { userRegistration } from '../../services/actions/authentication'

const Registration = () => {
  const [icon, setIcon] = useState('ShowIcon');
  const { hasError, userData } = useSelector(
    (state) => state.userData
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.inputData);
  const onSubmit = () => {
    dispatch(userRegistration(inputData, history));
  };

  const inputRef = useRef(null);

  const onIconClick = useCallback( () => {
        icon === 'ShowIcon' ? setIcon('HideIcon'): setIcon('ShowIcon');
  },[icon] )

  return ( 
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Регистрация</h1>
        <form className={styles.form}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setEmail(e.target.value)}
              value={name}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'text'}
              placeholder={'Email'}
              onChange={e => setEmail(e.target.value)}
              value={email}
              name={'email'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'text'}
              placeholder={'Пароль'}
              onChange={e => setPassword(e.target.value)}
              icon={icon}
              value={password}
              name={'password'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
        </form>
        <Button type="primary" size="medium" onClick={onSubmit}>Войти</Button>
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
