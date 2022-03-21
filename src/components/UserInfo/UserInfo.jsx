import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef} from "react";
import styles from './UserInfo.module.css';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function UserInfo() {
  // временные костыли
  const [email, setEmail] = useState('saiviolet@gmail.com');
  const [name, setName] = useState('Vilo4ka');
  const [password, setPassword] = useState('fdsfsdfsdf');
  const pass = password.replace(/[\s\S]/g, "*");
  const inputRef = useRef(null)
  //ТУДУ ф-ия изменения данных
  const onIconClick = () => {
    alert('Временно')
  }
  return (
    <div className={styles.block__user_info + " mt-30"}>
      <form className={styles.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          disabled={true}
        />
        <Input
          type={'text'}
          placeholder={'Логин/Почта'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'email'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          disabled={true}
        />
        <Input
          type={'text'}
          placeholder={'Пароль'}
          onChange={e => setPassword(e.target.value)}
          value={pass}
          name={'password'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          disabled={true}
        />
        </form>
    </div>
  )
}

export default UserInfo