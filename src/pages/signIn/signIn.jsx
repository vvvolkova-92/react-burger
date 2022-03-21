import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef} from "react";
import styles from './signIn.module.css';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null)
  const onIconClick = () => {
    alert('Временно')
  }
  return ( 
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Вход</h1>
        <form className={styles.form}>
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
              icon={'ShowIcon'}
              value={password}
              name={'password'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
        </form>
        <Button type="primary" size="medium">Войти</Button>
      </div>
      <div className={styles.actions + ' text text_type_main-default text_color_inactive mt-20'}>
        <div className={styles.action}>
          <span>Вы новый пользователь?</span>
          <Link
          to = '/register'
          className={styles.link}
          > 
          { ' ' }
          Зарегистрироваться
          </Link>
        </div>
        <div className={styles.action}>
          <span>Забыли пароль?</span>
          <Link
          to = '/forgot-password'
          className={styles.link}
          > 
          { ' ' }
          Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
