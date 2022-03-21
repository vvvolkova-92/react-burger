import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import styles from './ResetPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [icon, setIcon] = useState('ShowIcon');

  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const inputRef = useRef(null);

  const onIconClick = useCallback( () => {
        icon === 'ShowIcon' ? setIcon('HideIcon'): setIcon('ShowIcon');
  },[icon] )

  return ( 
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Восстановление пароля</h1>
        <form className={styles.form}>
            <Input
              type={'text'}
              placeholder={'Введите новый пароль'}
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
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={e => setCode(e.target.value)}
              value={code}
              name={'email'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />

        </form>
        <Button type="primary" size="medium">Сохранить</Button>
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
