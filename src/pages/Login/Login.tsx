import { FC } from "react";
import { useSelector, useAppDispatch } from "../../services/types/hooks";
import { Link } from 'react-router-dom';
// сторонние компоненты
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
// мои компоненты
import InputEmail from '../../components/Inputs/InputEmail';
import InputPassword from '../../components/Inputs/InputPassword';
//вспомогательные функции
import {getMessage} from "../../utils/constants";
import {userLogin} from "../../services/actions/authenticationAction";
//стили
import styles from "./Login.module.css";


const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { error, hasError } = useSelector(state => state.userReducer);
  const inputData = useSelector(state => state.inputReducer);
  const errorText = getMessage(error!);

  //TODO : сделать обработку ошибок и их вывод!
  const submitHandler = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(userLogin(inputData));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title + " text text_type_main-medium mb-6"}>Вход</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <InputEmail placeholder={'Email'}/>
        <InputPassword/>
        <div className={styles.button_container}>
          <Button type="primary" size="medium">Войти</Button>
        </div>
      </form>
      {hasError && <span className={styles.error}>{errorText}</span>}
      <div className={styles.actions + ' text text_type_main-default text_color_inactive mt-20'}>
        <div className={styles.action}>
          <span>Вы новый пользователь?</span>
          <Link
            to='/register'
            className={styles.link}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.action}>
          <span>Забыли пароль?</span>
          <Link
            to='/forgot-password'
            className={styles.link}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login
