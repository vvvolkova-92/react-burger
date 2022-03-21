import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import styles from './ForgotPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const inputRef = useRef(null);

  const onIconClick = useCallback( () => {
    console.log('pfujnjdrf');
  },[] )

  return ( 
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Восстановление пароля</h1>
        <form className={styles.form}>
            <Input
              type={'text'}
              placeholder={'Укажите e-mail'}
              onChange={e => setEmail(e.target.value)}
              value={email}
              name={'email'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
            />
        </form>
        <Button type="primary" size="medium">Восстановить</Button>
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
